import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {getData,storeData} from './utils/AsyncStorage';
import questions from './utils/Questions';

import Admin from "./screens/Admin"
import Dashboard from "./screens/Dashboard"
import Questioner from "./screens/Questioner"

export default function App() {
  const Stack = createStackNavigator();
  useEffect(() => {
    storeData("questions", questions)
  
    return () => {
     
    }
  }, [])
  
  return (
 
    <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={params => ({
          ...headerStyles,
          title: 'CIC',
          headerRight: () => (
            <AddButton
            title={"+ "}
            onPress={() => params.navigation.navigate('Admin')}
            />
            )
          })}
          />
      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{...headerStyles, title: 'Admin'}}
        />
      <Stack.Screen
        name="Questioner"
        component={Questioner}
        options={{...headerStyles, title: "Questioner"}}
        />
    </Stack.Navigator>
  </NavigationContainer>

  );
}

function AddButton ({title, onPress}) {
  return (
    <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    underlayColor='#fff'>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}
export const headerStyles = {
  headerStyle: {
    elevation: 0,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    alignContent: 'center',
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51ad63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor: 'transparent',
  },
  buttonText:{
    fontSize: 30
  }
});
