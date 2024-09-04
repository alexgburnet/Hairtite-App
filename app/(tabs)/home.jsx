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

      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to the <Text style={{ color: 'rgb(31, 73, 133)', fontFamily: 'Poppins-Medium' }}>Hairtite Retail</Text> App!</Text>
        <Text style={styles.text1}>Please take the quiz to get started</Text>
        <Text style={styles.text2}>This app will help you <Text style={styles.highlight}>assess and improve</Text> your knowledge and usage of Hairtite Retail <Text style={styles.highlight}>Hair Containment Devices</Text></Text>
        <Text style={styles.text3}>Your insights are valuable for maintaining <Text style={styles.highlight}>safety and compliance</Text> in the workplace</Text>
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
    margin: 13,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    textAlign: 'center'
  },
  text1: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    textAlign: 'center'
  },
  text2: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    textAlign: 'center'
  },
  text3: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    textAlign: 'center'
  },
  highlight: {
    fontFamily: 'Poppins-Medium',
    color: 'rgb(31, 73, 133)'
  },
  textContainer: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgb(220, 220, 220)',
    backgroundColor: 'white',
    padding: 15,
  },
})

export default home