import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getData,storeData} from '../utils/AsyncStorage';
import { TextInput } from 'react-native-gesture-handler';





const Admin = (props) => {
    const [questionList, setQuestionList] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [sessionName, setSessionName] = useState("")
    const [questionerList, setQuestionerList]=useState([]) 
  useEffect(() => {
    getData("questions").then(x=>setQuestionList(x)).catch(er=>console.log(er))
    getData("sessionForms").then(x=>x? setQuestionerList(x): null).catch(er=>console.log(er))
    console.log(questionerList,"admin")
    // const loadSelectedQuestions = async () => {
    //   const savedQuestions = await getData('selectedQuestions');
    //   if (savedQuestions) {
    //     setSelectedQuestions(savedQuestions);
    //   }
    // };
    // loadSelectedQuestions();
  }, []);
  //// check function
  
  const handleSubmit =()=>{
    const newQuestioner ={id:1 ,name:sessionName, created:new Date(Date.now()), questions:selectedQuestions}
    setQuestionerList([...questionerList,newQuestioner])
    console.log(questionerList, "qlAdmin")
    storeData("sessionForms", questionerList).then(()=>{setSessionName('');console.log()}).then(()=>props.navigation.navigate('Dashboard')).catch(er=>console.log(er))
  }

  const addQuestion = async (question) => {
    const isDuplicate = selectedQuestions.some((q) => q.id === question.id);
    if (!isDuplicate) {
      const updatedQuestions = [...selectedQuestions, question];
      setSelectedQuestions(updatedQuestions);
    //   await storeData('selectedQuestions', updatedQuestions);
    } else {
      console.log('This question already exists in the selected questions.');
    }
  };

  const removeQuestion = async (questionId) => {
    const updatedQuestions = selectedQuestions.filter(
      (q) => q.id !== questionId
    );
    setSelectedQuestions(updatedQuestions);
    // await storeData('selectedQuestions', updatedQuestions);
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

      <TextInput placeholder={'Session Name'} onChangeText={(e)=>setSessionName(e)}></TextInput>
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
        onPress={() => handleSubmit()}
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
  listBlock:{
    flex:2
  },
  selectBlock:{
    flex:2
  }
});

export default Admin;
