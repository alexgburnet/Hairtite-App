import { View, Text, SafeAreaView } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="sign-in" options = {{ headerShown: false }}/>
        <Stack.Screen name="about-you" options = {{ headerShown: false }}/>
        <Stack.Screen name="work" options= {{ headerShown: false }} />
        <Stack.Screen name="password" options= {{ headerShown: false }} />
        <Stack.Screen name="request-sent" options= {{ headerShown: false }} />
    </Stack>
  )
}

export default AuthLayout