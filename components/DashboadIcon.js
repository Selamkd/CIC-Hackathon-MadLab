import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useState } from 'react';
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
      'Sure about it?',
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
  const DownloadForm = (form) => {
    console.log(form);
    Alert.alert(
      'Download Summary',
      `After downloding the summary ${
        form.name || 'this'
      } form this sessiont resets.`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setIsLive(false), Alert.alert(' ', 'Summary saved on the device.');
          },
        },
      ]
    );
  };
  return (
    <View>
      <View style={styles.relativeContainer}>
        <TouchableOpacity
          style={isLive ? [styles.container, styles.isLive] : styles.container}
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
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
        {isLive && (
          <TouchableOpacity
            style={[styles.removeButton, styles.downloadBtn]}
            onPress={() => DownloadForm(payload)}
          >
            <Text style={styles.downloadLabel}>⤓</Text>
            <View style={styles.label}>
              <Text>In progress...</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    bottom: 50,
    right: -60,
    width: 80,
  },
  container: {
    // position: 'absolute',
    backgroundColor: '#e6e6e6',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 10,
    width: '96%',
    height: '96%',
  },
  relativeContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    // paddingtop: 10,
    marginTop: 20,
    width: 350,
    height: 200,
  },
  removeButton: {
    bottom: 210,
    left: 315,
    backgroundColor: 'red',
    borderRadius: 5,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBtn: {
    position: 'absolute',
    bottom: 35,
    left: 0,
    backgroundColor: '#e6e6e6',
  },

  removeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  downloadLabel: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  isLive: {
    backgroundColor: '#90ee9090',
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
