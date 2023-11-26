import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
}

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
  },
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const Righteous_Regular400 = {
    Righteous:
      'https://fonts.gstatic.com/s/a/b40fb221f7d3d9f9d2681d60785245f09112b91485a2380235241e647b852428.ttf',
  }
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    ...Righteous_Regular400,
  })
  // let [fontsLoaded] = useGoogleFonts({
  //   Righteous: Righteous_400Regular,
  // })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  )
}
