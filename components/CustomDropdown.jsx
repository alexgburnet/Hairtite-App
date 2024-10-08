import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';

const CustomDropdown = ({ category, data, value, onSelect, disabled }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: 'rgb(31,73,133)' },
          disabled && { opacity: 0.5 }  // Reduce opacity if disabled
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `Select ${category}` : '...'}
        searchPlaceholder="Search..."
        value={value}  // Use the value passed from the parent component
        search
        maxHeight={300}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          if (!disabled) {  // Only select if not disabled
            onSelect(item.value); // Trigger the onSelect callback with the selected value
            setIsFocus(false);    // Close the dropdown
          }
        }}
        disable={disabled}  // Correctly set disable prop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 16,
    paddingBottom: 5,
    paddingLeft: 5,
    fontFamily: 'Poppins-Light',
  },
  dropdown: {
    height: 64,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    borderRadius: 16,
    paddingHorizontal: 8,
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

export default CustomDropdown;