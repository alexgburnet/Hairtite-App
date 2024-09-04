import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

import CustomButton from '../../components/CustomButton';

/**
 * Screen for the user to see that their request has been sent
 * They will be able to sign in once their manager has accepted the request
 * This is to stop anyone from being able to say they work at a company without permission
 * 
 * @returns {JSX.Element}
*/

const requestSent = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.thankyou}>Thank-You!</Text>
            <Text style={styles.message}>You will be able to sign in once your manager has accepted your request</Text>
            <CustomButton
                style={styles.button}  // Apply custom styles here
                title="Return"
                handlePress={() => {router.dismissAll()}}
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
    thankyou: {
        fontSize: 38,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
    },
    message: {
        fontSize: 18,
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        width: '80%'
    },
    logo: {
        width: 200,
        height: 200,
    }
});

export default requestSent;