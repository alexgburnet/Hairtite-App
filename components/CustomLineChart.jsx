import { View, Text, Dimensions } from 'react-native'
import React from 'react'

import {
    LineChart,
  } from 'react-native-chart-kit'

/**
 * Custom Line Chart component
 * @param {Array} data - The data to display in the chart
 * @param {Number} width - The width of the chart
 * 
 * @returns {JSX.Element}
 */

const CustomLineChart = ({ data, width }) => {

  return (
    <View>
      <LineChart
        data={data}
        width={width} // from react-native
        height={220}
        yAxisLabel={'%'}
        chartConfig={{
          //backgroundGradientFrom: 'rgb(20, 60, 120)',
          //backgroundGradientTo: 'rgb(40, 80, 140)',
          backgroundGradientFrom: 'rgb(255, 255, 255)',
          backgroundGradientTo: 'rgb(255, 255, 255)',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(70, 70, 70, ${opacity})`,
        }}
        fromZero
        bezier
        style={{
          margin: 8,
        }}
      />
    </View>
  )
}

export default CustomLineChart