import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { getData, removeData, storeData } from '../utils/AsyncStorage';
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

  const handleRemoveForm = (form) => {
    Alert.alert(
      'Think about it!',
      `Do you really want to delete ${form.name || 'this'} form?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const forms = sessionForms.filter((x) => x.id != form.id);
            setSessionForms(forms);
            storeData('sessionForms', forms).catch((err) => console.log(err));
          },
        },
      ]
    );
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
                payload={item}
                session={[sessionForms, setSessionForms]}
                style={styles.iconShadow}
                title={item.name}
                description={item.description}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
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
    flex: 2,
    overflow: 'scroll',
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
