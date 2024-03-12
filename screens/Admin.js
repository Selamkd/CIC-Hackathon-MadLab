import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, Alert } from 'react-native';
import { getData, storeData } from '../utils/AsyncStorage';
import { demographicQuestions, generalSurveyQuestions } from '../utils/Questions';

const Admin = (props) => {
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [sessionName, setSessionName] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [questionerList, setQuestionerList] = useState([]);
  const [updateState, setUpdateState] = useState(true);
  const [isAdminPasswordSet, setIsAdminPasswordSet] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('demographic');

  useEffect(() => {
    getData('questions')
      .then((x) => setQuestionList(x))
      .catch((er) => console.log(er));

    getData('sessionForms')
      .then((x) => (x ? setQuestionerList(x) : null))
      .catch((er) => console.log(er));

    // Check if admin password is set
    getData('isAdminPasswordSet')
      .then((isSet) => {
        setIsAdminPasswordSet(isSet || false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Load questions based on the selected category
    const loadQuestions = async () => {
      try {
        const categoryQuestions = selectedCategory === 'demographic' ? demographicQuestions : generalSurveyQuestions;
        setQuestionList(categoryQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, [selectedCategory, updateState]);

  const updateStateFunction = (SN, QL) => {
    const newQuestioner = {
      id: questionerList.length + 1,
      name: SN,
      description: sessionDescription,
      created: new Date(Date.now()),
      questions: QL,
    };
    setQuestionerList([...questionerList, newQuestioner]);
  };

  const handleSubmit = () => {
    setUpdateState(!updateState);
    return storeData('sessionForms', questionerList)
      .then(() => props.navigation.navigate('Dashboard'))
      .catch((er) => console.log(er));
  };

  const addQuestion = (question) => {
    const isDuplicate = selectedQuestions.some((q) => q.id === question.id);

    if (!isDuplicate) {
      const updatedQuestionList = questionList.filter((q) => q.id !== question.id);
      setQuestionList(updatedQuestionList);

      const updatedQuestions = [...selectedQuestions, question];
      setSelectedQuestions(updatedQuestions);
    } else {
      console.log('This question already exists in the selected questions.');
    }
  };

  const removeQuestion = (question) => {
    const updatedQuestions = selectedQuestions.filter((q) => q.id !== question.id);
    setSelectedQuestions(updatedQuestions);

    const updatedQuestionList = [...questionList, question];
    setQuestionList(updatedQuestionList);
  };

  const renderQuestionItem = (item, func) => (
    <TouchableOpacity onPress={() => func(item)} style={styles.questionItem}>
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );

  const handlePasswordSubmit = () => {
    getData('adminPassword')
      .then((savedPassword) => {
        if (enteredPassword === savedPassword) {
          setEnteredPassword(''); // Clear entered password
          setIsAdminPasswordSet(false); // Disable password protection once verified
        } else {
          Alert.alert('Incorrect password. Please try again.');
        }
      })
      .catch((err) => console.log(err));
  };

  // If admin password is set, render password input
  if (isAdminPasswordSet) {
    return (
      <View style={styles.passwordContainer}>
        <Text>Please enter the admin password:</Text>
        <TextInput
          secureTextEntry
          value={enteredPassword}
          onChangeText={setEnteredPassword}
          style={styles.passwordInput}
        />
        <Button title="Submit" onPress={handlePasswordSubmit} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.listBlock}>
        <Text style={styles.heading}>Admin Interface</Text>
        <TextInput
          placeholder={'Session Name'}
          onChangeText={(e) => setSessionName(e)}
        />
        <TextInput
          placeholder={'Session Description'}
          onChangeText={(e) => setSessionDescription(e)}
        />
        <View style={styles.categoryButtons}>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: selectedCategory === 'demographic' ? '#51ad63' : '#e6e6e6' }]}
          onPress={() => setSelectedCategory('demographic')}
        >
          <Text style={styles.categoryButtonText}>Demographic Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: selectedCategory === 'general' ? '#51ad63' : '#e6e6e6' }]}
          onPress={() => setSelectedCategory('general')}
        >
          <Text style={styles.categoryButtonText}>General Survey Questions</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.subHeading}>Available Questions:</Text>
        <FlatList
          data={questionList}
          renderItem={({ item }) => renderQuestionItem(item, addQuestion)}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.selectBlock}>
        <Text style={styles.subHeading}>Selected Questions:</Text>
        <FlatList
          data={selectedQuestions}
          renderItem={({ item }) => renderQuestionItem(item, removeQuestion)}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPressOut={handleSubmit}
        onPressIn={() => updateStateFunction(sessionName, selectedQuestions)}
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
  passwordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
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
  listBlock: {
    flex: 3,
  },
  questionItem: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    marginBottom: 5, // Increase marginBottom to provide more space between questions
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
  selectBlock: {
    flex: 2,
  },
  categoryButtons: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 10,
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Admin;
