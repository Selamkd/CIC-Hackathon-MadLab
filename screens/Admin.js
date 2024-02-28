import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getData,storeData} from '../utils/AsyncStorage';

const questions = [
  { id: 1, text: 'What is your age?', type: 'text' },
  { id: 2, text: 'What is your gender identity?', type: 'text' },
  { id: 3, text: 'What is your ethnicity or race?', type: 'droplist',options:["Red","Green","Blue"] },
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Interface</Text>

      <Text style={styles.subHeading}>Available Questions:</Text>
      <FlatList
        data={questions}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Text style={styles.subHeading}>Selected Questions:</Text>
      <FlatList
        data={selectedQuestions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => removeQuestion(item.id)}
            style={styles.selectedQuestionItem}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => console.log('Selected questions:', selectedQuestions)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  questionItem: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    marginBottom: 5,
    borderRadius: 5,
  },
  selectedQuestionItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#51ad63',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Admin;
