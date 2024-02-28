import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const questions = [
  { id: 1, text: 'What is your name?', type: 'text' },
  { id: 2, text: 'What is your age?', type: 'number' },
];

const Admin = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const addQuestion = (question) => {
    setSelectedQuestions([...selectedQuestions, question]);
  };

  const removeQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== questionId));
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
