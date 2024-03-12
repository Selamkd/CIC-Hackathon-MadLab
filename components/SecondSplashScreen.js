import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { getData } from '../utils/AsyncStorage';

const SecondSplashScreen = () => {
  const [splashScreenUrl, setSplashScreenUrl] = useState('');
  const [companyName, setCompanyName] = useState('Undefined');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    const loadData = async () => {
      try {
        const url = await getData('customizedSecondSplash');
        if (url) {
          setSplashScreenUrl(url);
        }

        const storedCompanyName = await getData('customCompanyName');
        if (storedCompanyName) {
          setCompanyName(storedCompanyName);
        }

        const storedBackgroundColor = await getData('customBackgroundColor');
        if (storedBackgroundColor) {
          setBackgroundColor(storedBackgroundColor);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const getTextColor = () => {
    // Determine text color based on background color
    // You can customize this logic as per your preference
    return backgroundColor === '#000000' ? '#ffffff' : '#000000';
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {splashScreenUrl ? (
        <>
          <Image source={{ uri: splashScreenUrl }} style={styles.logo} />
          <Text style={[styles.text, { color: getTextColor() }]}>{companyName}</Text>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default SecondSplashScreen;
