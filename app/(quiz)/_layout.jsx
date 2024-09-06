import { Stack } from 'expo-router';
import React from 'react'
import { Image } from 'react-native'

const quizLayout = () => {
  return (
    <Stack>
        <Stack.Screen
          name="quizscreen"
          options={({ route }) => ({
            title: "quiz",
            headerShown: true,
            headerStyle: {
              height: 110,
            },
            headerTitle: () => (
              <Image
                source={require('../../assets/images/hairtite-banner.png')}
                style={{ width: 200, height: 40, marginBottom: 10}}
                resizeMode="contain"
              />
            ),
          })}
        />
        <Stack.Screen
          name="resultscreen"
          options={{
            title: "results",
            headerShown: true,
            headerStyle: {
              height: 110,
            },
            headerTitle: () => (
              <Image
                source={require('../../assets/images/hairtite-banner.png')}
                style={{ width: 200, height: 40 }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Stack.Screen
          name="followup"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
    </Stack>
  )
}

export default quizLayout