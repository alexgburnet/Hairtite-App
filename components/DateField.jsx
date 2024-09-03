import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";

/**
 * A component that renders a date input field
 * @param {string} title - The title of the field
 * @param {string} value - The value of the field
 * @param {function} handleChangeDate - The function to handle the change of the date
 * 
 * @returns {JSX.Element}
 * 
 */

const DateField = ({ title, value, handleChangeDate }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        const formattedDate = date.toLocaleDateString();
        handleChangeDate(formattedDate);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
    
          <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
            <Text style={styles.dateText}>{value}</Text>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        width: '100%'
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

export default DateField;