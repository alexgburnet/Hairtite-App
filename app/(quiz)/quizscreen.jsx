import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useQuiz } from '../../contexts/QuizContext';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { SERVER_URL } from '../../config';

const QuizScreen = () => {
  const { currentQuestionIndex, score, incrementScore, nextQuestion } = useQuiz();
  const router = useRouter();
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [questionLength, setQuestionLength] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/questions`);
        setQuestions(response.data);
        setQuestionLength(response.data.length);
        setLoading(false); // Set loading to false once questions are fetched
      } catch (error) {
        Alert.alert('Error fetching questions, check your network connection');
        router.back();
      }
    };

    getQuestions();
  }, []);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (currentQuestion.answer === answer) {
      setShowCorrectMessage(true);
      incrementScore();
      setTimeout(() => {
        setShowCorrectMessage(false);
        nextQuestion();
      }, 1500);
    } else {
      router.push({
        pathname: '/followup',
        params: {
          question: currentQuestion.followup,
          correctAnswer: currentQuestion.fanswer,
          info: currentQuestion.info,
        },
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="rgb(31,73,133)" />
        <Text>Loading questions...</Text>
      </View>
    );
  }

  if (currentQuestionIndex >= questionLength) {
    // get integer percentage score
    const percentScore = Math.round((score / questionLength) * 100);
    router.replace(`/resultscreen?percentScore=${percentScore}`);
    return null;
  }

  return (
    <View style={showCorrectMessage ? styles.messageContainer : styles.questionContainer}>
      {showCorrectMessage ? (
        <View style={styles.messageContainer}>
          <Text style={styles.correctMessage}>Correct!</Text>
          <AntDesign name="checkcircle" size={120} color="#4CAF50" />
          <Text style={styles.scoreText}>Your score: {score}</Text>
        </View>
      ) : (
        <>
        <View style={styles.questionBoxContainer}>
          <View style={styles.questionBox}>
            <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
            <View style={styles.questionTextContainer}>
              <Text style={styles.questionText}>{questions[currentQuestionIndex]?.question}</Text>
            </View>
          </View>
        </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.yesButton}
              title={"True"}
              handlePress={() => handleAnswer(true)}
            />
            <CustomButton
              style={styles.noButton}
              title={"False"}
              handlePress={() => handleAnswer(false)}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  questionBoxContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  questionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  questionNumber: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  questionTextContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    height: 150,
    marginBottom: 5,
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 40,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  noButton: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 40,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  correctMessage: {
    fontSize: 48,
    color: '#4CAF50',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreText: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
});

export default QuizScreen;