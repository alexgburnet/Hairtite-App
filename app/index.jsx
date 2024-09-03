import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

import CustomButton from '../components/CustomButton';

const Index = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Measuring Staff Engagement for Hair Containment</Text>
            <CustomButton
                style={styles.button}  // Apply custom styles here
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
        alignItems: 'center', // Centers the items horizontally
        gap: 80,
    },
    button: {
        width: '80%',  // Adjust the button width
    },
    title: {
        width: '80%',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    }
});

export default Index;