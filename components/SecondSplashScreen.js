// SecondSplashScreen.js
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SecondSplashScreen = ({ backgroundColor, logo }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image source={{ uri: logo }} style={styles.logo} />
      <Text style={styles.text}>Customizable Splash Screen</Text>
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
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SecondSplashScreen;
