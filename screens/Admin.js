
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, TextInput } from 'react-native';

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
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([...questions]);

  useEffect(() => {
    loadForm();
  }, []);

  const loadForm = async () => {
    try {
      const storedForm = await AsyncStorage.getItem('form');
      if (storedForm) {
        const parsedForm = JSON.parse(storedForm);
        setFormTitle(parsedForm.title);
        setFormDescription(parsedForm.description);
        setSelectedQuestions(parsedForm.selectedQuestions);
        updateAvailableQuestions(parsedForm.selectedQuestions);
      }
    } catch (error) {
      console.error('Error loading form:', error);
    }
  };

  const updateAvailableQuestions = (selected) => {
    const remainingQuestions = questions.filter(
      (question) => !selected.some((selectedQ) => selectedQ.id === question.id)
    );
    setAvailableQuestions(remainingQuestions);
  };

  const saveForm = async () => {
    try {
      const form = {
        title: formTitle,
        description: formDescription,
        selectedQuestions,
      };
      await AsyncStorage.setItem('form', JSON.stringify(form));
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const updateFormTitle = (title) => {
    setFormTitle(title);
    saveForm();
  };

  const updateFormDescription = (description) => {
    setFormDescription(description);
    saveForm();
  };

  const addQuestion = async (question) => {
    const isDuplicate = selectedQuestions.some((q) => q.id === question.id);
    if (!isDuplicate) {
      const updatedQuestions = [...selectedQuestions, question];
      setSelectedQuestions(updatedQuestions);
      updateAvailableQuestions(updatedQuestions);
      saveForm();
    } else {
      console.log('This question already exists in the selected questions.');
    }
  };

  const removeQuestion = async (questionId) => {
    const updatedQuestions = selectedQuestions.filter(
      (q) => q.id !== questionId
    );
    setSelectedQuestions(updatedQuestions);
    updateAvailableQuestions(updatedQuestions);
    saveForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Title:</Text>
      <TextInput
        style={styles.input}
        value={formTitle}
        onChangeText={updateFormTitle}
      />

      <Text style={styles.title}>Form Description:</Text>
      <TextInput
        style={styles.input}
        value={formDescription}
        onChangeText={updateFormDescription}
      />

      <Text style={styles.title}>Selected Questions:</Text>
      <FlatList
        data={selectedQuestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => removeQuestion(item.id)}
            style={styles.selectedQuestionItem}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.title}>Available Questions:</Text>
      <FlatList
        data={availableQuestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => addQuestion(item)}
            style={styles.questionItem}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Save/Update Button */}
      <Button title="Save/Update Form" onPress={saveForm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
  },
  questionItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
  },
  selectedQuestionItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#e0e0e0',
    padding: 8,
    marginVertical: 8,
  },
});

export default Admin;