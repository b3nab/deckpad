import React, { useRef, useState, useEffect } from 'react'
import { AppState, Alert, Linking, Dimensions, LayoutAnimation, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import * as Device from 'expo-device'
import * as Permissions from 'expo-permissions'
import { StatusBar } from 'expo-status-bar'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Button, TextInput } from 'react-native-paper'
// import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import io from 'socket.io-client'


import { Deck } from './ui'

const ConnectTo = ({ setIPLan }) => {
  const [hasPermission, setHasPermission] = useState(null)
  // const { getItem, setItem } = useAsyncStorage('@deckpad.address')
  // const [ lastIP, setLastIP] = useState('')
  const [ IP, setIP] = useState('')
  const [ scanQR, setScanQR] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
      // const savedLastIP = await getItem()
      // if (savedLastIP) setLastIP(savedLastIP)
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(`qrcode with type ${type} and data ${data} has been scanned!`)
    setIPLan(data)
    setScanQR(false)
  }
  const inputIPLan = () => {
    // setItem(IP)
    setIPLan(IP)
  }

  const buildIP = (ip, port=defaultPort) => {
    return `${ip}:${port}`
  }

  return (
    <View style={styles.container}>
      {scanQR &&
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000000', zIndex: 3, elevation: 3 }]}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      }
      {/* <Text>DeckPad - not connected</Text> */}
      {/* <Text>Companion status is: ok</Text> */}
      <Text />
      <View style={styles.div}>
        <TextInput
          label="protocol://ip:port"
          value={IP}
          onChangeText={newIP => setIP(newIP)}
        />
      </View>
      <Text />
      <Button onPress={() => inputIPLan()} mode='outlined'>Connect to LAN IP</Button>
      <Text />
      <Button onPress={() => setScanQR(true)} mode='contained'>Scan QR Code</Button>
      <Text />
      <Text />
      <Text />
      {/* {!!lastIP && 
        <Button onPress={() => setIPLan(lastIP)} mode='contained'>Connect to last IP</Button>
      } */}
      {/* {hasCameraPermission === null ? 
        <Text>Requesting for camera permission</Text>
        : hasCameraPermission === false ? 
          <Text style={{ color: '#fff' }}>
            Camera permission is not granted. Please allow camera permission to scan the QRCode.
          </Text>
          : <BarCodeScanner
              onBarCodeRead={_handleBarCodeRead}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            />
      } */}
      {/* <StatusBar style="auto" /> */}
    </View>
  )
}

export default function App() {
  const [ IPLan, setIPLan ] = useState(false)
  const [ board, setBoard ] = useState()
  const [ actual, setActual ] = useState(0)
  const [api, setAPI] = useState()
  const appState = useRef(AppState.currentState)
  const [appResume, setAppResume] = useState(true)
  console.log('fn AppState => ', AppState.currentState)
  
  useEffect(() => {
    console.log('effect AppState => ', AppState.currentState)
    AppState.addEventListener('change', _handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [])

  const _handleAppStateChange = (nextAppState) => {
    if(appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      setAppResume(true)
    }
    console.log('change AppState => ', nextAppState)
  }

  function initCompanion() {
    try {
      console.log(`[DECK] server address is ${IPLan}`)
      console.log('[DECK] initCompanion()')
      const socket = io(IPLan)
      setAPI(socket)
      
      console.log('[IO] build listeners')
      socket.on('connect', () => {
        console.log('[IO] connected to socket server! Device is: ', Device.deviceName)
        socket.emit('companion', Device.deviceName)
      })

      socket.on('disconnect', () => {
        console.log('[IO] DeckPad io client throttling')
        !appResume && setAPI()
        !appResume && setBoard()
        !appResume && setIPLan()
        setAppResume(false)
      })
      socket.on('off', () => {
        console.log('[IO] DeckPad disconnected')
        setAPI()
        setBoard()
        setIPLan()
        setAppResume(false)
      })
      
      socket.on('board', (boardObject) => {
        // console.log(`[IO] update board `,{boardObject})
        setBoard(boardObject)
      })

      socket.on('toast', (toastObject) => {
        console.log(`[IO] show toast `,{toastObject})
        // setBoard(toastObject)
      })
      
      return () => {
        console.log('return of effect! exit from initCompanion')
        socket.offAny()
        socket.close()
        // setIPLan()
        setAPI()
        setBoard()
      }
    } catch (error) {
      console.error('Deck.initCompanion : ', error)
      setIPLan()
    }
  }

  useEffect(() => {
    if(IPLan) {
      setAppResume(false)
      return initCompanion()
    }
  }, [IPLan])

  if(!IPLan) {
    return (
      <ConnectTo setIPLan={setIPLan} />
    )
  }

  return (
    <View style={styles.container}>
      <Deck board={board} actual={actual} setActual={setActual} api={api} goToHome={() => setIPLan(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#151520',
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    // flex: 1,
    width: '80%',
    backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
