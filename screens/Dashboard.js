import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getData, removeData } from '../utils/AsyncStorage';
import DashboardIcon from '../components/DashboadIcon';

export default function Dashboard({ navigation }) {
  const [sessionForms, setSessionForms] = useState([]);

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
  }, [navigation]);

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
<<<<<<< Updated upstream
        <DashboardIcon
          navigation={navigation}
          payload={'question1'}
          title={'Decorate Your Own Money Box'}
          description={
            'Join us at Offerton Library on Mon Feb 12, 2024 at 10:30 AM for a fun-filled event where you can unleash your creativity and personalise your very own money box!'
          }
        ></DashboardIcon>

        <DashboardIcon
          navigation={navigation}
          style={styles.icon}
          payload={'question2'}
          title={'Talk about money CIC'}
          description={
            'Come and join us at our supportive, friendly peer support group. You can get specialist guidance from the group facilitator, share tips with others, and most importantly get help to make a plan and then follow that plan, step by step.'
          }
        ></DashboardIcon>

        <DashboardIcon
          style={styles.icon}
          navigation={navigation}
          payload={'question3'}
          title={'Financial inclusion'}
          description={
            'Join us at Main Street Community Center on Sat Mar 15, 2024 at 2:00 PM for an enlightening workshop on financial inclusion.'
          }
        ></DashboardIcon>
      </View>
      <Text
        onPress={() => {
          setRef(!ref);
          console.log(listAllSessionForms);
        }}
      ></Text>
=======
        {sessionForms.map((form) => (
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
        ))}
      </View>
>>>>>>> Stashed changes
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
});
