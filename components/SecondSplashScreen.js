import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, BackHandler } from 'react-native';
import { useConfig } from './context/AllContext';

const SecondSplashScreen = ({ navigation, route }) => {
  const { stateConfig } = useConfig();
  const [splashScreenUrl, setSplashScreenUrl] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    setSplashScreenUrl(stateConfig.customizedSecondSplash);
    setBackgroundColor(stateConfig.customBackgroundColor);
    // Simulate a delay for the second splash scre
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 2500);
  }, [stateConfig]);

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
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
              },
            ]}
          >
            {stateConfig.customCompanyName}
          </Text>
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
