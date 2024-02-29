import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { getData, storeData } from '../utils/AsyncStorage';
import { TextInput } from 'react-native-gesture-handler';

const Admin = (props) => {
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [sessionName, setSessionName] = useState('');
  const [questionerList, setQuestionerList] = useState([]);
  const [upteState, setUpdateStae] = useState(true);
  useEffect(() => {
    getData('questions')
      .then((x) => setQuestionList(x))
      .catch((er) => console.log(er));
    getData('sessionForms')
      .then((x) => (x ? setQuestionerList(x) : null))
      .catch((er) => console.log(er));
    console.log(questionerList, 'admin');
  }, []);
  //// check function
  const updateState = (SN, QL) => {
    const newQuestioner = {
      id: questionerList.length + 1,
      name: SN,
      created: new Date(Date.now()),
      questions: QL,
    };
    setQuestionerList([...questionerList, newQuestioner]);
  };

  const handleSubmit = () => {
    setUpdateStae(!upteState);
    return storeData('sessionForms', questionerList)
      .then(() => props.navigation.navigate('Dashboard'))
      .catch((er) => console.log(er));
  };

  const addQuestion = (question) => {
    const isDuplicate = selectedQuestions.some((q) => q.id === question.id);
  
    if (!isDuplicate) {
      // Remove the added question from questionList
      const updatedQuestionList = questionList.filter((q) => q.id !== question.id);
      setQuestionList(updatedQuestionList);
  
      const updatedQuestions = [...selectedQuestions, question];
      setSelectedQuestions(updatedQuestions);
    } else {
      console.log('This question already exists in the selected questions.');
    }
  };

  const removeQuestion = (questionId) => {
    const updatedQuestions = selectedQuestions.filter(
      (q) => q.id !== questionId
    );
    setSelectedQuestions(updatedQuestions);
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
      <View style={styles.listBlock}>
        <Text style={styles.heading}>Admin Interface{sessionName}</Text>

        <TextInput
          placeholder={'Session Name'}
          onChangeText={(e) => setSessionName(e)}
        ></TextInput>
        <Text style={styles.subHeading}>Available Questions:</Text>
        <FlatList
          data={questionList}
          renderItem={renderQuestionItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.selectBlock}>
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
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPressOut={handleSubmit}
        onPressIn={() => updateState(sessionName, selectedQuestions)}
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
  listBlock: {
    flex: 2,
  },
  selectBlock: {
    flex: 2,
  },
});

export default Admin;
