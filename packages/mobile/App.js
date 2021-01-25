import React, { useState, useEffect } from 'react'
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import * as Permissions from 'expo-permissions'
import { StatusBar } from 'expo-status-bar'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Button, TextInput } from 'react-native-paper'

import { Deck } from './ui'

const ConnectTo = ({ setIPLan }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [ IP, setIP] = useState('')
  const [ scanQR, setScanQR] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(`qrcode with type ${type} and data ${data} has been scanned!`)
    setIPLan(data)
    setScanQR(false)
  }
  const inputIPLan = () => {
    setIPLan(IP)
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
      <Text>MyDeck - not connected</Text>
      <Text>Companion status is: ok</Text>
      <Text />
      <View style={styles.div}>
        <TextInput
          label="IPLan"
          value={IP}
          onChangeText={newIP => setIP(newIP)}
        />
      </View>
      <Text />
      <Button onPress={() => inputIPLan()} mode='outlined'>Connect to LAN IP</Button>
      <Text />
      <Button onPress={() => setScanQR(true)} mode='contained'>Scan QR Code</Button>
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

  if(!IPLan) {
    return (
      <ConnectTo setIPLan={setIPLan} />
    )
  }

  return (
    <View style={styles.container}>
      <Deck serverAddress={IPLan} goToHome={() => setIPLan(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  div: {
    // flex: 1,
    width: '80%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
