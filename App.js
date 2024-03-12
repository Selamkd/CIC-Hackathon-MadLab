import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getData, storeData } from './utils/AsyncStorage';
import questions from './utils/Questions';

import Admin from "./screens/Admin"
import Dashboard from "./screens/Dashboard"
import Questioner from "./screens/Questioner"
import SecondSplashScreen from './components/SecondSplashScreen';
import SetupScreen from './screens/SetupScreen';

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {
    getData("questions").then(q => {!q ? storeData("questions", questions) : null }).catch(err => console.log(err))

    return () => {

    }
  }, [])

  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  const [showSecondSplash, setShowSecondSplash] = useState(true);
  const [secondSplashConfig, setSecondSplashConfig] = useState({
    backgroundColor: '#51ad63',
    logo: 'your_logo_url_here',
  });

  const [customCompanyName, setCustomCompanyName] = useState("Undefined");

  useEffect(() => {
    // Check if it's the first time setup
    getData('isFirstTimeSetup').then((firstTimeSetup) => {
      setIsFirstTimeSetup(firstTimeSetup || false);
    }).catch(err => console.error(err));

    // Load second splash screen configuration
    getData('secondSplashConfig')
      .then((config) => {
        if (config) {
          setSecondSplashConfig(config);
        }
      })
      .catch((err) => console.log(err));

    // Simulate a delay for the second splash screen
    setTimeout(() => {
      setShowSecondSplash(false);
    }, 3000);
  }, []);

  useEffect(() => {
    getData('customCompanyName')
      .then((companyName) => {
        setCustomCompanyName(companyName || "Undefined");
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSecondSplash && (
          <Stack.Screen name="SecondSplash" options={{ headerShown: false }}>
            {() => (
              <SecondSplashScreen
                backgroundColor={secondSplashConfig.backgroundColor}
                logo={secondSplashConfig.logo}
              />
            )}
          </Stack.Screen>
        )}
        <>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={(params) => ({
              ...headerStyles,
              title: customCompanyName || "Undefined",
              headerRight: () => (
                <AddButton
                  title={"+ "}
                  onPress={() => params.navigation.navigate("Admin")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={(params) => ({
              ...headerStyles,
              title: "Admin",
              headerRight: () => (
                <AddButton
                  title={"+ "}
                  onPress={() => params.navigation.navigate("Setup")}
                />
              ),
            })}
          />

          <Stack.Screen
            name="Setup"
            component={SetupScreen}
            options={{
              headerShown: false,
              gestureEnabled: false, // Disable gestures during setup
            }}
          />
          <Stack.Screen
            name="Questioner"
            component={Questioner}
            options={{ ...headerStyles, title: "Questioner" }}
          />
        </>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AddButton({ title, onPress }) {
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
  button: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 30
  }
});
