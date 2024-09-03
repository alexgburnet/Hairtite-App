import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuiz } from '../../contexts/QuizContext'; // Adjust the path as needed
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import CustomButton from '../../components/CustomButton';

const QuizScreen = () => {
  const { currentQuestionIndex, score, incrementScore, nextQuestion } = useQuiz();
  const router = useRouter();
  const [showCorrectMessage, setShowCorrectMessage] = React.useState(false);

  // Use useEffect to handle navigation when all questions are answered
  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      router.replace(`/resultscreen?score=${score}`);
    }
  }, [currentQuestionIndex, score, router]);

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

  if (currentQuestionIndex >= questions.length) {
    return null; // Early return if we're at the end of the quiz, but navigation is handled in useEffect
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
          <View style={styles.questionBox}>
            <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
            <View style={styles.questionTextContainer}>
              <Text style={styles.questionText}>{questions[currentQuestionIndex]?.question}</Text>
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

// ...rest of the styles and component code

export default QuizScreen;