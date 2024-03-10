import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { getData, storeData } from '../utils/AsyncStorage';
// import generateExcelFromJson from '../utils/Export';

export default function Questioner({ route, navigation }) {
  const payload = route.params?.payload;
  const [formData, setFormData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [responsStore, setResponeStore] = useState([]);
  const survayName = `${payload.name}-Survay`;

  useEffect(() => {
    const loadFormData = async () => {
      const forms = await getData('sessionForms');
      console.log('questioner', forms, 'payload:', payload);

      if (forms && payload) {
        const selectedForm = forms.find((form) => form.id === payload.id);
        setFormData(selectedForm);
      }
    };

    loadFormData();
  }, [payload, answers]);
  useEffect(() => {
    getData(`${payload.name}+Survay`)
      .then((data) => {
        data ? setResponeStore(data) : storeData('responseStore', []);
      })
      .catch((er) => console.log(er));
  }, []);

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
        onChangeText={(text) => handleAnswerChange(item.text, text)}
      />
    </View>
  );
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
          <TouchableOpacity
            style={styles.submitButton}
            onPressIn={() => {
              setResponeStore([...responsStore, answers]);
              console.log('save Response store', responsStore);
            }}
            onPressOut={() => {
              storeData('responseStore', responsStore).then(() => {
                setAnswers();
                setFormData();
                console.log('answers', responsStore);
              });
            }}
          >
            <Text style={styles.submitButtonText}>save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => console.log(responsStore)}
            // onPress={generateExcelFromJson(JSON.stringify(responsStore, 'Response'))}
          >
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
