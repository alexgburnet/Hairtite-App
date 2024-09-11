import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router'

import CustomLineChart from '../../components/CustomLineChart';
import CustomButton from '../../components/CustomButton'

import { useQuiz } from '../../contexts/QuizContext';

import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

import { SERVER_URL } from '../../config';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 80, 70, 90, 80, 100, 80 ],
  }]
}

const home = () => {

  const [width, setChartWidth] = useState(0)
  const [scoreData, setScoreData] = useState(data)
  const [staffID, setStaffID] = useState(null)

  const { quizLastCompleted } = useQuiz();

  useEffect(() => {
    const getScoreData = async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('access_token');

            if (!accessToken) {
                Alert.alert('No access token found, please log out and log back in');
                return;
            }

            const decodedToken = jwtDecode(accessToken);

            const response = await axios.post(`${SERVER_URL}/api/get-scores`, {
                staff_id: decodedToken.staff_id
            });

            // Transform the response data
            const responseData = response.data;
            const labels = responseData.map(item => item.date);
            const data = responseData.map(item => item.score);

            // reverse the data so that the most recent data is at the front
            data.reverse();
            labels.reverse();

            // If data is empty, set empty data
            if (data.length === 0) {
                setScoreData({
                    labels: ['', '', '', '', '', ''],
                    datasets: [{
                        data: [ 0, 0, 0, 0, 0, 0 ],
                    }]
                });
                return;
            }

            // if data length is less than 6, pad with 0s
            if (data.length < 6) {
                const diff = 6 - data.length;
                for (let i = 0; i < diff; i++) {
                    data.unshift(0);
                    labels.unshift('');
                }
            }

            const formattedData = {
                labels: ['','','','','',''],
                datasets: [{
                    data: data
                }]
            };

            setScoreData(formattedData);
        } catch (error) {
            console.log(error);
        }
    }

    getScoreData();
}, [quizLastCompleted]);

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
        <CustomLineChart data={scoreData} width={width} height={175}/>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to the <Text style={{ color: 'rgb(31, 73, 133)', fontFamily: 'Poppins-Medium' }}>Hairtite Retail</Text> App!</Text>
        <Text style={styles.text2}>This app will help you <Text style={styles.highlight}>assess and improve</Text> your knowledge and usage of our HACCP International Certified Hairtite Retail <Text style={styles.highlight}>Hair Containment Devices</Text></Text>
        <Text style={styles.text3}>Your insights are valuable for maintaining <Text style={styles.highlight}>safety and compliance</Text> in the workplace</Text>
        <Image source={require('../../assets/images/HACCP.png')} style={{ width: 50, height: 50 }} />
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