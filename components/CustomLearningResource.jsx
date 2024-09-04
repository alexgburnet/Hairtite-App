import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const CustomLearningResource = ({ title, description, imageURL }) => {
  return (
    <View style={styles.container}>
        <Image 
            source={{ uri: imageURL }}
            style={styles.image}
        />
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: 'rgb(220, 220, 220)',
        backgroundColor: 'white',
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    description: {
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Poppins-Light',
    },
})

export default CustomLearningResource