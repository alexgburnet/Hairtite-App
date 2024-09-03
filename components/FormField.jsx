import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)

  return (
    <View>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
            style={styles.textInput}
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            secureTextEntry={(title==='Password' || title==='Confirm Password') && !showPassword}
        />

        {(title === 'Password' || title === 'Confirm Password') && (
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPassword}
            >
                <Image
                    source={showPassword ? require ('../assets/icons/eye.png') : require('../assets/icons/eye-hide.png')}
                    style={styles.eyeIcon}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
      },
      title: {
        fontSize: 16,
        paddingBottom: 5,
        paddingLeft: 5
      },
      inputContainer: {
        borderWidth: 2,
        borderColor: '#B0B0B0',
        width: '100%',
        height: 64,
        paddingHorizontal: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      textInput: {
        flex: 1,
        fontSize: 16,
      },
      eyeIcon: {
        width: 24,
        height: 24,
      },
})

export default FormField