import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

import CustomButton from '../components/CustomButton';

/**
 * Initial screen for the app
 */

const Index = () => {
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
                handlePress={() => {router.push('/sign-in')}}
            />
        </View>
    </SafeAreaView>
  )
}

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
    },
    logo: {
        height: 130,
        resizeMode: 'contain',
    }
});

export default Index;