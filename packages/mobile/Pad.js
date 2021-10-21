import React, { useRef, useState, useEffect } from 'react'
import { AppState, Alert, Linking, Dimensions, LayoutAnimation, Text, View, StyleSheet, Image } from 'react-native'
import * as Device from 'expo-device'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Button, Title, TextInput } from 'react-native-paper'
// import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import ioClient from 'socket.io-client'
import { Deck } from './ui'
import logo from './assets/icon.png'


// AUTO DISCOVERY FN EXAMPLE
// var socket;
// for(var i=1; i<255; i++) {
//   socket = new WebSocket('ws://192.168.1.'+i+':8080/service');

//   socket.onopen = function () {   
//     console.log('WebSocket Connected!!');   
//   };

//   socket.onclose = function (event) {
//     console.log('WebSocket Disconnected!!');
//     socket.close();
//   };

//   socket.onmessage = function (event) {
//     console.log('WebSocket receive msg: ' + event.data);
//   }
// }


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
      <View style={{...styles.div, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={logo} style={{ width: 100, height: 100 }} />
        <Title style={{ fontFamily: 'Righteous', fontSize: 50, lineHeight: 80 }}>DeckPad</Title>
        <View style={styles.div}>
          <TextInput
            label="protocol://ip:port"
            value={IP}
            onChangeText={newIP => setIP(newIP)}
          />
        </View>
        <Button onPress={() => inputIPLan()} mode='outlined'>Connect to LAN IP</Button>
        <Text />
        <Button onPress={() => setScanQR(true)} mode='contained'>Scan QR Code</Button>
      </View>

      <Text />
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
    </View>
  )
}

export default function Pad() {
  const [ IPLan, setIPLan ] = useState(false)
  const [ board, setBoard ] = useState()
  const [ actual, setActual ] = useState(0)
  const [io, setIO] = useState()
  // shadow board (on updates)
  const [ shadowBoard, setShadowBoard ] = useState({})
  // deepmerge(source, target)
  // source is the partial or path payload
  // target is the full object (in time it's the previous object)
  const deepmerge = (source, target) => {
    let final = target
    for (const [key, val] of Object.entries(source)) {
      if (val !== null && typeof val === `object`) {
        if (target[key] === undefined) {
          final[key] = new val.__proto__.constructor()
        }
        final[key] = deepmerge(val, target[key])
      } else {
        final[key] = val
      }
    }
    return final
  }
  const updateShadowBoard = (partialShadow) => {
    const newShadow = deepmerge(partialShadow, shadowBoard)
    // console.log('new Shadow!', newShadow)
    setShadowBoard({...newShadow})
  }
  
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
      console.log('Pad has come to the foreground!')
      setAppResume(true)
    }
    console.log('change AppState => ', nextAppState)
  }

  function initCompanion() {
    try {
      console.log(`[DECK] server address is ${IPLan}`)
      console.log('[DECK] initCompanion()')
      const socket = ioClient(IPLan)
      setIO(socket)
      
      console.log('[IO] build listeners')
      socket.on('connect', () => {
        console.log('[IO] connected to socket server! Device is: ', Device.deviceName)
        socket.emit('companion', Device.deviceName)
      })

      socket.on('disconnect', () => {
        console.log('[IO] DeckPad io client throttling')
        !appResume && setIO()
        !appResume && setBoard()
        !appResume && setIPLan()
        setAppResume(false)
      })
      socket.on('off', () => {
        console.log('[IO] DeckPad disconnected')
        setIO()
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

      socket.on('update-label', (shadowLabel) => {
        // console.log('update label!', shadowLabel)
        updateShadowBoard(shadowLabel)
      })
      
      return () => {
        console.log('return of effect! exit from initCompanion')
        socket.offAny()
        socket.close()
        // setIPLan()
        setIO()
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
      <Deck board={board} shadowBoard={shadowBoard} actual={actual} setActual={setActual} io={io} goToHome={() => setIPLan(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    // display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#070716',
    color: '#FFFFFF'
  },
  div: {
    // flex: 1,
    width: '80%',
    // backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
