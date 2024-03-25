import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputRender from '../components/SurvayItem';
import { Box, NativeBaseProvider, FlatList } from 'native-base';
import { useSurvayLog } from '../components/context/SurvayLogListContext';
import { ScrollView } from 'react-native-virtualized-view';

// import generateExcelFromJson from '../utils/Export';

export default function Questioner({ route, navigation }) {
  const questionListRef = useRef(null);
  const payload = route.params?.payload;
  const [formData, setFormData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [counter, steCounter] = useState(0);
  const [sessionName, setSessionName] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { stateSurvayLog, dispatchSurvayLog } = useSurvayLog();
  // console.log('survayLog Data:   ', stateSurvayLog.data);
  const scrollToIndex = (index) => {
    if (questionListRef.current) {
      const scrollIndex = index === 1 ? index + 1 : index - 1;
      console.log('inex:  ', index);
      questionListRef.current.scrollToIndex({ index, animated: true });
    }
  };
  useEffect(() => {
    const isAllAnswered = (questionList, answerObj) => {
      const answerKeys = Object.keys(answerObj);
      if (answerKeys.length !== questionList.length) return false;
      for (let key of answerKeys) {
        if (!answerObj[key]) return false;
        if (answerObj[key] === 'Answer Here...') return false;
      }
      return true;
    };
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
    console.log('set submit to: ', answers);
    setSubmitDisabled(!isAllAnswered(payload.questions, answers));
  }, [payload, answers]);

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

  const renderSurvay = ({ item, index }) => (
    <InputRender
      item={item}
      setAnswer={setAnswers}
      answer={answers}
      scroll={scrollToIndex}
      index={index}
    />
  );

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {formData ? (
          <View style={styles.box}>
            <Text style={styles.heading}>{formData.name}</Text>
            <Text>Completed Survays: {counter}</Text>

            <View style={styles.box}>
              <FlatList
                ref={questionListRef}
                data={formData.questions}
                ItemSeparatorComponent={() => (
                  <View
                    style={[
                      { margin: 10 },
                      { justifyContent: 'space-around' },
                      { height: 10 },
                    ]}
                  />
                )}
                renderItem={({ item, index }) => renderSurvay({ item, index })}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                  <Box h={300}>
                    <TouchableOpacity
                      disabled={submitDisabled}
                      style={[
                        styles.submitButton,
                        {
                          backgroundColor: submitDisabled ? 'gray' : '#51ad63',
                        },
                      ]}
                      onPressIn={() => {
                        handleFormSubmit(sessionName);
                      }}
                    >
                      <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </Box>
                }
              />
            </View>
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
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 3,
    position: 'relative',
  },
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
