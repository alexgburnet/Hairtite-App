import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, isLoading, style}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.button, style]} // Apply external styles here
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
    fontWeight: 'bold',
  },
});

export default CustomButton;