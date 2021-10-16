import React from 'react'
import { View, StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Pad from './Pad'

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  fucsia: '#F02BAD',
  indaco: '#3D5AD5',
  blue: '#2B7FE2',
  cyan: '#00D1FF',
  bg: '#030303',
  paper: '#070709',
}
const theme = {
  ...DefaultTheme,
  colors: {
    primary: colors.white,
    secondary: colors.indaco,
    background: colors.bg,
    surface: colors.paper,
    text: colors.white,
  }
}

export default function App() {
  let [fontsLoaded] = useFonts({
    'Righteous': Righteous_400Regular
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Pad />
        </View>
      </PaperProvider>
    )
  }
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
  }
})
