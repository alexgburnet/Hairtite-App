import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const TabsLayout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear tokens or handle logout logic

    Alert.alert('Are you sure you want to log out?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log Out',
        onPress: () => logout(),
      },
    ]);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    router.back(); // Navigate to index or login screen
  }

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
              style={{ width: 200, height: 40, margin: 10 }}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={handleLogout}>
                <AntDesign name="logout" size={24} color="black" style={{marginLeft: 15}} />
              </TouchableOpacity>
            </View>
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
          title: "Learning",
          headerShown: true,
          headerStyle: {
            height: 110,
          },
          headerTitle: () => (
            <Image
              source={require('../../assets/images/hairtite-banner.png')}
              style={{ width: 200, height: 40, margin: 10 }}
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
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 10,
  },
});

export default TabsLayout;