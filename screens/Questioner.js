import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSurvayLog } from '../components/context/SurvayLogListContext';
// import generateExcelFromJson from '../utils/Export';

export default function Questioner({ route, navigation }) {
  const payload = route.params?.payload;
  const [formData, setFormData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [counter, steCounter] = useState(0);
  const [sessionName, setSessionName] = useState();
  const { stateSurvayLog, dispatchSurvayLog } = useSurvayLog();
  console.log(stateSurvayLog.data);

  useEffect(() => {
    const now = new Date(Date.now());
    const fileName = `${payload.name}-${now.getDate()}.${
      now.getMonth() + 1
    }.${now.getFullYear()}`;
    setSessionName(fileName);

    const loadFormData = async () => {
      if (payload) {
        // const selectedForm = forms.find((form) => form.id === payload);
        const selectedForm = payload;
        setFormData(selectedForm);
      }
    };

    loadFormData();
  }, [payload, answers]);
  // useEffect(() => {
  //   getData('responseStore')
  //     .then((data) => {
  //       data ? setResponeStore(data) : storeData('responseStore', []);
  //     })
  //     .catch((er) => console.log(er));
  // }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };
  const handleFormSubmit = (sessName) => {
    // console.log(sessName);
    console.log(answers[sessName], sessName);
    const payload = {
      ...stateSurvayLog.data,
      [sessName]: [...(stateSurvayLog.data[sessName] || []), { ...answers }],
    };
    dispatchSurvayLog({
      type: 'UPDATE',
      payload: {
        data: payload,
      },
    });
    setAnswers([]);
    setFormData(null);
    steCounter(counter + 1);
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
          <Text>Completed Survays: {counter}</Text>
          <FlatList
            data={formData.questions}
            renderItem={renderQuestionItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPressIn={() => {
              handleFormSubmit(sessionName);
              // setResponeStore([...responsStore, answers]);
            }}
            onPressOut={() => {
              // storeData('responseStore', responsStore).then(() => {
              //   setAnswers({});
              //   setFormData(null);
              //   console.log(answers);
              // });
            }}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.submitButton}
            // onPress={generateExcelFromJson(JSON.stringify(responsStore, 'Response'))}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity> */}
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
