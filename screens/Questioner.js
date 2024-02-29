import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { getData } from '../utils/AsyncStorage';

<<<<<<< Updated upstream
export default function Questioner(params) {
  const payload = params.route.params.payload;
=======
export default function Questioner({ route }) {
  const payload = route.params?.payload;
  const [formData, setFormData] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const loadFormData = async () => {
      const forms = await getData('sessionForms');

      if (forms && payload) {
        const selectedForm = forms.find((form) => form.id === payload);
        setFormData(selectedForm);
      }
    };

    loadFormData();
  }, [payload]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const renderQuestionItem = ({ item }) => (
    <View style={styles.questionItem}>
      <Text style={styles.questionText}>{item.text}</Text>
      <TextInput
        style={styles.answerInput}
        placeholder="Your answer"
        onChangeText={(text) => handleAnswerChange(item.id, text)}
      />
    </View>
  );
>>>>>>> Stashed changes

  return (
    <View style={styles.container}>
      {formData ? (
        <View>
          <Text style={styles.heading}>{formData.name}</Text>
          <FlatList
            data={formData.questions}
            renderItem={renderQuestionItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading form data...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< Updated upstream
    backgroundColor: '#fffff',
=======
    backgroundColor: '#ffffff',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionItem: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#51ad63',
    padding: 15,
>>>>>>> Stashed changes
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
