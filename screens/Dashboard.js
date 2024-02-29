import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getData, removeData, storeData } from '../utils/AsyncStorage';
import DashboardIcon from '../components/DashboadIcon';

export default function Dashboard({ navigation }) {
  const [sessionForms, setSessionForms] = useState([]);

  const [refS, setRefS] = useState(true);

  const refreshState = () => setRefS(!refS);

  const loadSessionForms = async () => {
    const forms = await getData('sessionForms');

    if (forms) {
      setSessionForms(forms);
    }
  };

  useEffect(() => {
    // Load session forms when the component mounts

    loadSessionForms();

    // Use event listener to refresh session forms when navigating back from Admin

    const unsubscribeFocus = navigation.addListener('focus', () => {
      loadSessionForms();
    });

    return () => {
      // Cleanup the event listener

      unsubscribeFocus();
    };
  }, [navigation, refS]);

  const handleRemoveForm = async (formId) => {
    // Remove the form from AsyncStorage

    await removeData(`sessionForms_${formId}`);

    // Reload the session forms

    loadSessionForms();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign up for a workshop</Text>

      <View style={styles.iconList}>


      <FlatList
          data={sessionForms}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.formContainer}>
            <DashboardIcon
              navigation={navigation}
              payload={item.id}
              style={styles.iconShadow}
              title={item.name}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveForm(item.id)}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
            
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* {sessionForms.map((form) => (
          <View key={form.id} style={styles.formContainer}>
            <DashboardIcon
              navigation={navigation}
              payload={form.id}
              style={styles.iconShadow}
              title={form.name}
            />

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveForm(form.id)}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))} */}
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPressOut={() => storeData('sessionForms', []).then(refreshState())}

        // onPressIn={() => updateState(sessionName, selectedQuestions)}
      >
        <Text style={styles.submitButtonText}>Clear All session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fffff',

    justifyContent: 'center',
  },

  iconList: {
    flex:2,
    overflow: "scroll",
    gap: 20,

    justifyContent: 'center',

    flexDirection: 'column',

    flexWrap: 'no-wrap',

    alignItems: 'center',

    width: '100%',
  },

  icon: {
    backgroundColor: 'black',
  },

  text: {
    fontSize: 20,

    textAlign: 'center',

    marginBottom: 17,

    color: '#013220',

    fontWeight: 'bold',
  },

  formContainer: {
    position: 'relative',
  },

  iconShadow: {
    shadowColor: 'black',

    shadowOffset: {
      width: 0,

      height: 7,
    },

    shadowOpacity: 0.41,

    shadowRadius: 9.11,

    elevation: 10,
  },

  removeButton: {
    position: 'absolute',

    top: 5,

    right: 5,

    backgroundColor: 'red',

    borderRadius: 15,

    width: 20,

    height: 20,

    alignItems: 'center',

    justifyContent: 'center',
  },

  removeButtonText: {
    color: '#fff',

    fontSize: 12,

    fontWeight: 'bold',
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
