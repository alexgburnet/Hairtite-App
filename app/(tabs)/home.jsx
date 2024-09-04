import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

import CustomLineChart from '../../components/CustomLineChart';
import CustomButton from '../../components/CustomButton'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 80, 70, 90, 80, 100, 80 ],
  }]
}

const home = () => {

  const [width, setChartWidth] = useState(0)

  return (
    <SafeAreaView style={styles.container}>

      <View
        style={styles.chartcontainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setChartWidth(width); // Set the chart width to the width of the parent view
        }}
      > 
        <Text style={styles.title}>Your Progress</Text>
        <CustomLineChart data={data} width={width}/>
      </View>

      <CustomButton 
        title="Take Quiz"
        handlePress={() => {router.push('/quizscreen')}}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  chartcontainer: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgb(220, 220, 220)',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 15,
    gap: 150,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    textAlign: 'center'
  }
})

export default home