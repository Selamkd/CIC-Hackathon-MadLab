import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DashboardIcon from '../components/DashboardIcon';

export default function Dashboard({ navigation }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const storedForm = await AsyncStorage.getItem('form');
      if (storedForm) {
        const parsedForm = JSON.parse(storedForm);
        setFormData(parsedForm);
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {formData ? (
        <View style={styles.iconList}>
          {formData.selectedQuestions.map((question) => (
            <DashboardIcon key={question.id} title={question.text} />
          ))}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#ffffff" />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51ad63',
    justifyContent: 'center',
  },
  iconList: {
    gap: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});