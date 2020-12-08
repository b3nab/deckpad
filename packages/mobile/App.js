import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import { Deck } from './ui'

const ConnectTo = ({ setIPLan }) => {
  const [ IP, setIP] = useState('')

  const scanQRCode = () => {
    setIPLan('192.168.1.50:832')
  }
  const inputIPLan = () => {
    setIPLan(IP)
  }

  return (
    <View style={styles.container}>
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
      <Button onPress={() => scanQRCode()} mode='contained'>Scan QR Code</Button>
      <StatusBar style="auto" />
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
      <Deck serverIP={IPLan} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
