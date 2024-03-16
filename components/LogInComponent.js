import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAccessControll } from './context/AccessControllContext';

export default function LogInComponent() {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [stateAccessConteroll, setAccessContoroll] = useAccessControll();

  const handlePasswordSubmit = () => {
    const password = stateConfig.adminPassword;

    if (enteredPassword === password) {
      setEnteredPassword(''); // Clear entered password
      setAccessContoroll(false); // Disable password protection once verified
    } else {
      Alert.alert('Incorrect password. Please try again.');
    }
  };
  return (
    <View style={styles.passwordContainer}>
      <Text>Please enter the admin password:</Text>
      <TextInput
        secureTextEntry
        value={enteredPassword}
        onChangeText={setEnteredPassword}
        style={styles.passwordInput}
      />
      <Button title="Submit" onPress={handlePasswordSubmit} />
    </View>
  );
}
const styles = StyleSheet.create({
  passwordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
});
