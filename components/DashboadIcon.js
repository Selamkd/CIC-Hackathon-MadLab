import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function DashboardIcon({
  title,
  navigation,
  payload,
  description,
}) {
  return (
    <TouchableOpacity
      style={styles.iconShadow}
      onPress={() => navigation.navigate('Questioner', { payload })}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
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
    color: '#51ad63',
    fontWeight: '900',
    marginBottom: 11,
  },
});
