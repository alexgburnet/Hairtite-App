import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

/**
 * Custom button component
 *
 * @param {String} title - The text to display on the button
 * @param {Function} handlePress - The function to run when the button is pressed
 * @param {Boolean} isLoading - Whether the button is in a loading state
 * @param {Object} style - The style of the button
 * 
 * @returns {JSX.Element}
*/

const CustomButton = ({ title, handlePress, isLoading, style}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.button, style]}
    >
      <Text style={styles.buttonText}>
        {isLoading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(31, 73, 133)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default CustomButton;