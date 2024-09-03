import { View, Text, SafeAreaView, Image } from 'react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'rgb(31, 73, 133)',
        tabBarInactiveTintColor: 'rgb(150, 150, 150)',
        tabBarStyle: {
          borderTopWidth: 1,
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={({ route }) => ({
          title: "Home",
          headerShown: true,
          headerStyle: {
            height: 110,
          },
          headerTitle: () => (
            <Image
              source={require('../../assets/images/hairtite-banner.png')}
              style={{ width: 200, height: 40, margin: 10 }} // Adjust size as needed
              resizeMode="contain"
            />
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={focused ? 34 : 30}
              color={focused ? 'rgb(31, 73, 133)' : 'rgb(150, 150, 150)'}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="learning-resources"
        options={({ route }) => ({
          title: "Learning Resources",
          headerShown: true,
          headerStyle: {
            height: 110,
          },
          headerTitle: () => (
            <Image
              source={require('../../assets/images/hairtite-banner.png')}
              style={{ width: 200, height: 40, margin: 10 }} // Adjust size as needed
              resizeMode="contain"
            />
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="book"
              size={focused ? 34 : 30}
              color={focused ? 'rgb(31, 73, 133)' : 'rgb(150, 150, 150)'}
            />
          ),
        })}
      />
    </Tabs>
  );
}

export default _layout;