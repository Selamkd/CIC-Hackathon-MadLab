import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getData, storeData } from '../utils/AsyncStorage';
export default function DashboardIcon({
  title,
  navigation,
  payload,
  description,
  session,
}) {
  const [isLive, setIsLive] = useState(false);
  [sessionForms, setSessionForms] = session;
  const handleRemoveForm = (form) => {
    console.log(form);
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
    <View>
      <View style={styles.relativeContainer}>
        <TouchableOpacity
          style={isLive ? styles.isLive : styles.container}
          onPress={() => {
            setIsLive(true);
            navigation.navigate('Questioner', { payload });
          }}
        >
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text>{description}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveForm(payload)}
        >
          <Text style={styles.removeButtonText}>⤓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    backgroundColor: '#e6e6e6',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 10,
    width: 350,
    height: 200,
  },
  relativeContainer: {
    position: 'relative',
    flex: 1,

    justifyContent: 'center',
    width: 360,
    height: 270,
  },
  removeButton: {
    bottom: 215,

    left: 310,

    backgroundColor: 'red',

    borderRadius: 5,

    width: 45,

    height: 45,

    alignItems: 'center',

    justifyContent: 'center',
  },

  removeButtonText: {
    color: '#fff',

    fontSize: 20,

    fontWeight: 'bold',
  },
  isLive: {
    backgroundColor: 'green',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 10,
    width: 350,
    height: 200,
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
  title: {
    textAlign: 'center',
    padding: '10%',
    color: '#51ad63',
    fontWeight: '900',
    marginBottom: -10,
  },
});
