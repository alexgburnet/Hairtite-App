import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useQuiz } from '../../contexts/QuizContext'; 
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import CustomButton from '../../components/CustomButton';

/**
 * Followup screen for the app, displays some guidance and a followup question
 * If this is answered correctly, the user will be shown a correct message and the next question
 * If this is answered incorrectly, the quiz moves on to the next question
 * 
 * @returns {ReactElement} The followup screen
*/

const FollowupScreen = () => {
  const { incrementScore, nextQuestion, score } = useQuiz();
  const router = useRouter();
  const { question, correctAnswer, info } = useLocalSearchParams();

  const [showCorrectMessage, setShowCorrectMessage] = React.useState(false);

  const handleFollowupAnswer = (answer) => {
    if (answer === JSON.parse(correctAnswer)) {
      incrementScore();
      setShowCorrectMessage(true);
      setTimeout(() => {
        setShowCorrectMessage(false);
        router.back();
        nextQuestion();
      }, 1500);
    } else {
      router.back();
      nextQuestion();
    }
  };

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
          <Text style={styles.incorrect}>Incorrect!</Text>

          <View style={styles.factContainer}>
            <Text style={styles.didyouknow}>Did you know:</Text>
            <View style={styles.infoContainer}>
              <AntDesign name="infocirlceo" size={24} color="#333" />
              <Text style={styles.infotext}>{info}</Text>
            </View>
          </View>

          <View style={styles.newQuestion}>
            <Text style={styles.apply}>Apply Your New Knowledge:</Text>
            <View style={styles.infoContainer}>
              <AntDesign name="questioncircleo" size={24} color="#333" />
              <Text style={styles.question}>{question}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.yesButton}
              title={"True"}
              handlePress={() => handleFollowupAnswer(true)}
            />
            <CustomButton
              style={styles.noButton}
              title={"False"}
              handlePress={() => handleFollowupAnswer(false)}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#f4f4f4',
  },
  incorrect: {
    marginTop: 40,
    fontSize: 40,
    color: '#F44336',
    fontWeight: 'bold',
  },
  factContainer: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  didyouknow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  infotext: {
    fontSize: 16,
    color: '#555',
  },
  newQuestion: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  apply: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreText: {
    marginTop: 20,
    fontSize: 24,
    color: '#333',
  },
});

export default FollowupScreen;