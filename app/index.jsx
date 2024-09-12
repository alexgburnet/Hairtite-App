import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import { SERVER_URL } from '../config';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('access_token');
        const refreshToken = await SecureStore.getItemAsync('refresh_token');

        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000; // Convert to seconds

          // Check if access token is expired
          if (decodedToken.exp > currentTime) {
            // Navigate to the tabs screen if the token is valid
            router.push('/home');
            return;
          } else {
            // If access token is expired, try to refresh it
            if (refreshToken) {
              console.log('Refreshing token...');
              const response = await axios.post(`${SERVER_URL}/refresh`, {
                refresh_token: refreshToken,
              });

              if (response.status === 200) {
                console.log('Token refreshed');
                const { access_token } = response.data;
                await SecureStore.setItemAsync('access_token', access_token); // Store new access token
                router.push('/home');
                return;
              } else {
                // Clear tokens if refresh fails
                console.log('Token refresh failed');
                await SecureStore.deleteItemAsync('access_token');
                await SecureStore.deleteItemAsync('refresh_token');
              }
            }
          }
        }
      } catch (error) {
        console.error('Error checking token validity:', error);
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/hairtiteRetailLogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Measuring Staff Engagement for Hair Containment</Text>
        <CustomButton
          style={styles.button}
          title="Sign-In"
          handlePress={() => router.push('/sign-in')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 80,
  },
  button: {
    width: '80%',
  },
  title: {
    width: '80%',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  logo: {
    height: 130,
    resizeMode: 'contain',
  }
});

export default Index;