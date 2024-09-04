import { View, Text, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

/**
 * Custom Dropdown component
 * @param {string} category - The category of the dropdown
 * @param {Array} data - The data to display in the dropdown
 * 
 * @returns {JSX.Element}
 */

import React, { useState } from 'react'


const CustomDropdown = ({ category, data}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    return (
      <View style={styles.container}>
        <Text style={styles.title}>{category}</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}

          iconStyle={styles.iconStyle}
          data={data}
          fontFamily='Poppins-Light'
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? `Select ${category}` : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    title: {
      fontSize: 16,
      paddingBottom: 5,
      paddingLeft: 5,
      fontFamily: 'Poppins-Light',
    },
    dropdown: {
      height:64,
      borderWidth: 2,
      borderColor: '#B0B0B0',
      borderRadius: 16,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });


export default CustomDropdown