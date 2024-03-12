import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { storeData } from '../utils/AsyncStorage';

export default function SetupScreen({ navigation }) {
  const [companyName, setCompanyName] = useState('');
  const [splashScreen, setSplashScreen] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Default color

  const handleSetup = () => {
    // Check if splash screen and admin password are provided
    if (!splashScreen || !adminPassword) {
      alert('Please enter both Splash Screen URL and Admin Password.');
      return;
    }

    // Store splash screen, admin password, and company name
    storeData('customCompanyName', companyName);
    storeData('customizedSecondSplash', splashScreen);
    storeData('adminPassword', adminPassword);
    storeData('isAdminPasswordSet', true);
    storeData('customBackgroundColor', selectedColor); // Store background color

    // Set flag to indicate first-time setup is complete
    storeData('isFirstTimeSetup', false);

    // Navigate to the main screen
    navigation.navigate('Dashboard', {
      customCompanyName: companyName,
      adminPasswordSet: Boolean(adminPassword),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Your App</Text>
      <TextInput
        style={styles.input}
        placeholder="Set Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Splash Screen URL"
        value={splashScreen}
        onChangeText={setSplashScreen}
      />
      <TextInput
        style={styles.input}
        placeholder="Set Admin Password"
        secureTextEntry
        value={adminPassword}
        onChangeText={setAdminPassword}
      />

      <Text style={styles.colorLabel}>Select Background Color:</Text>
      <View style={styles.colorButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: '#ffffff', borderColor: selectedColor === '#ffffff' ? '#51ad63' : 'transparent' },
          ]}
          onPress={() => setSelectedColor('#ffffff')}
        />
        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: '#000000', borderColor: selectedColor === '#000000' ? '#51ad63' : 'transparent' },
          ]}
          onPress={() => setSelectedColor('#000000')}
        />
      </View>

      <Button title="Setup" onPress={handleSetup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  colorLabel: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
  },
});
