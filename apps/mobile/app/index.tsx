import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
// import AppLoading from 'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Pad from './pad'
import { Stack } from 'expo-router'
import { Text } from '../components/Themed'

export default function Home() {
  return (
    <View style={styles.container}>
      <Pad />
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
    backgroundColor: '#030303',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
