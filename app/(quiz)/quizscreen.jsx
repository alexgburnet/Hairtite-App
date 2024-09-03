import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuiz } from '../../contexts/QuizContext'; // Adjust the path as needed
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import CustomButton from '../../components/CustomButton';

const questions = [
  {
    question: "During an average of 8 hour-shift we average human beings naturally shed 40 – 130 hairs every day.",
    answer: true,
    info: "An average of 40 -130 hair-shafts will be lost to natural cyclical processes per day.",
    followup: "The average human sheds up to 130 hairs naturally every day.",
    fanswer: true,
  },
  {
    question: "Do modern styling & hair-care practices damage hair?",
    answer: true,
    info: "A) Excessive heat - higher temperature from / of hair driers / styling tongues/straighteners\n\nB) Perm solutions, dyes / straightening chemicals – Trichologists believe",
    followup: "Using hot tools like dryers or straighteners and chemicals like perm solutions impacts hair contamination.",
    fanswer: true,
  },
  {
    question: "Does washing and combing remove all residual hair?",
    answer: false,
    info: "NO. (Prof. Barry Stevens FTTS President of The Trichological Society 2014-16 says: “Staphylococci/streptococci may present at sites of infection with e.g. impetigo, insect bites, minor trauma, eczema etc. whilst it is known that the scalp can be a haven for bacteria - especially the relatively harmless Malassez Furfur (Pityrosporum Ovale). I am unable to eliminate hair shafts as disease carriers (i.e. Staphylococcus Aureus). However, hand contact with the scalp during food production is probably more likely to act as a carrier therefore complete head hair covering is recommended. I cannot ignore the potential for contamination via beard hair as this can be an involuntary target of touch by infrequently washed hands. Covering the beard with net is therefore a wise precaution”.",
    followup: "Daily combed hair, well-groomed beard, neatly trimmed brows and daily showering prevent removal of all loose hairs.",
    fanswer: false,
  },
];

const QuizScreen = () => {
  const { currentQuestionIndex, score, incrementScore, nextQuestion } = useQuiz();
  const router = useRouter();
  const [showCorrectMessage, setShowCorrectMessage] = React.useState(false);

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
    router.replace(`/resultscreen?score=${score}`);
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
          <View style={styles.questionBox}>
            <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
            <View style={styles.questionTextContainer}>
              <Text style={styles.questionText}>{questions[currentQuestionIndex]?.question}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.yesButton}
              title={"Yes"}
              handlePress={() => handleAnswer(true)}
            />
            <CustomButton
              style={styles.noButton}
              title={"No"}
              handlePress={() => handleAnswer(false)}
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
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  questionBox: {
    marginTop: 150,
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
    fontWeight: '600',
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

export default QuizScreen;