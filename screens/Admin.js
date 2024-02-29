import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
  { id: 1, text: 'What is your age?', type: 'text' },
  { id: 2, text: 'What is your gender identity?', type: 'text' },
  { id: 3, text: 'What is your ethnicity or race?', type: 'text' },
  { id: 4, text: 'Where are you located?', type: 'text' },
  {
    id: 5,
    text: 'What is your highest level of education completed?',
    type: 'text',
  },
  { id: 6, text: 'What is your approximate household income?', type: 'text' },
  {
    id: 7,
    text: 'What is the highest level of education and approximate income of your parents or guardians?',
    type: 'text',
  },
  { id: 8, text: 'Are you currently employed?', type: 'text' },
  { id: 9, text: 'What is the primary language spoken at home?', type: 'text' },
  {
    id: 10,
    text: 'Do you have any accessibility needs we should be aware of?',
    type: 'text',
  },
  { id: 11, text: 'What are your interests or hobbies?', type: 'text' },
  {
    id: 12,
    text: 'Have you attended similar workshops or events before?',
    type: 'text',
  },
  { id: 13, text: 'How did you find out about our workshops?', type: 'text' },
];

const Admin = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    const loadSelectedQuestions = async () => {
      const savedQuestions = await getData('selectedQuestions');
      if (savedQuestions) {
        setSelectedQuestions(savedQuestions);
      }
    };
    loadSelectedQuestions();
  }, []);

  const addQuestion = async (question) => {
    const isDuplicate = selectedQuestions.some((q) => q.id === question.id);
    if (!isDuplicate) {
      const updatedQuestions = [...selectedQuestions, question];
      setSelectedQuestions(updatedQuestions);
      await storeData('selectedQuestions', updatedQuestions);
    } else {
      console.log('This question already exists in the selected questions.');
    }
  };

  const removeQuestion = async (questionId) => {
    const updatedQuestions = selectedQuestions.filter(
      (q) => q.id !== questionId
    );
    setSelectedQuestions(updatedQuestions);
    await storeData('selectedQuestions', updatedQuestions);
  };

  const renderQuestionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => addQuestion(item)}
      style={styles.questionItem}
    >
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );
};
