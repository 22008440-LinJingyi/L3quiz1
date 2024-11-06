import React, { useState } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet, ScrollView, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";

const questions = [
  {
    pic: 1,
    question: "What animal is this?",
    image: require('./img/elephant.jpg'),
    options: [
      { label: 'Dog', value: 'Dog' },
      { label: 'Rhino', value: 'Rhino' },
      { label: 'Elephant', value: 'Elephant' }
    ],
    correctAnswer: 'Elephant',
  },
  {
    pic: 2,
    question: "What animal is this?",
    image: require('./img/leopard.jpg'),
    options: [
      { label: 'Lion', value: 'Lion' },
      { label: 'Tiger', value: 'Tiger' },
      { label: 'Leopard', value: 'Leopard' }
    ],
    correctAnswer: 'Leopard',
  },
  {
    pic: 3,
    question: "What animal is this?",
    image: require('./img/hummingbird.jpg'),
    options: [
      { label: 'Humming Bird', value: 'Humming Bird' },
      { label: 'Peacock', value: 'Peacock' },
      { label: 'Duck', value: 'Duck' }
    ],
    correctAnswer: 'Humming Bird',
  },
  {
    pic: 4,
    question: "This animal has a long neck, What is this animal?",
    image: require('./img/giraffe.jpg'),
    options: [
      { label: 'Penguin', value: 'Penguin' },
      { label: 'Turtle', value: 'Turtle' },
      { label: 'Zebra', value: 'Zebra' },
      { label: 'Giraffe', value: 'Giraffe' }
    ],
    correctAnswer: 'Giraffe',
  },
  {
    pic: 5,
    question: "This animal has good vision at night, What is this animal?",
    image: require('./img/owl.jpg'),
    options: [
      { label: 'Owl', value: 'Owl' },
      { label: 'Rabbit', value: 'Rabbit' },
      { label: 'Penguin', value: 'Penguin' },
      { label: 'Squirrel', value: 'Squirrel' }
    ],
    correctAnswer: 'Owl',
  }
];

const Question = ({ question, image, options, selectedAnswer, onSelectAnswer }) => (
    <View>
      <Image source={image} style={styles.image} />
      <Text>{question}</Text>
      <RNPickerSelect
          onValueChange={onSelectAnswer}
          items={options}
          placeholder={{ label: "Select an answer...", value: "Select an answer..." }}
          value={selectedAnswer}
      />
    </View>
);

const QuizApp = () => {
  const [answers, setAnswers] = useState({});
  const [username, setUsername] = useState('');

  const Select = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const Submit = () => {
    let correctCount = 0;
    questions.forEach(question => {
      if (answers[question.pic] === question.correctAnswer) correctCount++;
    });

    // ADVANCED FEEDBACK
    let feedback;
    if (correctCount === questions.length) {
      feedback = "Well done! You got a full score!";
    } else if (correctCount >= questions.length / 2) {
      feedback = "Great effort! Keep on.";
    } else {
      feedback = "You can do better next time.";
    }

    Alert.alert(
        `You have ${correctCount} correct answers!\n${feedback}`
    );
  };

  const handleLogin = () => {
    ToastAndroid.show("Welcome " + username, ToastAndroid.SHORT);
  };

  return (
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Icon name="fish" size={20} color="#B23B23"  />
        <Text style={styles.title}>Animal Quiz</Text>

        <Text>User Name:</Text>
        <TextInput
            style={{ borderWidth: 1, marginBottom: 10 }}
            onChangeText={setUsername}
            value={username}
        />
        <TouchableOpacity onPress={handleLogin}>
          <Text style={{ color: 'blue' }}>Submit</Text>
        </TouchableOpacity>


        {questions.map(q => (
            <Question
                key={q.pic}
                question={q.question}
                image={q.image}
                options={q.options}
                selectedAnswer={answers[q.pic]}
                onSelectAnswer={answer => Select(q.pic, answer)}
            />
        ))}
        <Button title="Submit Answers" onPress={Submit} />
      </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 400, height: 255 },
});

export default QuizApp;
