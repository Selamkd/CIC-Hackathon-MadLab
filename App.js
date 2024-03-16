import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApplicationStartingPoint from './ApplicationStaringPoint';
import Admin from './screens/Admin';
import Dashboard from './screens/Dashboard';
import Questioner from './screens/Questioner';
import SecondSplashScreen from './components/SecondSplashScreen';
import SetupScreen from './screens/SetupScreen';
import {
  AllQuestionsProvider,
  UserConfigProvider,
  AccessControllProvider,
  useConfig,
} from './components/context/AllContext';
import { getData } from './utils/AsyncStorage';

export default function App() {
  // const Stack = createStackNavigator();

  // const [companyName, setCompanyName] = useState();
  // const [isUserSet, setIsUserSet] = useState(false);
  // const [showSecondSplash, setShowSecondSplash] = useState(true);

  // useEffect(() => {
  //   // Simulate a delay for the second splash screen
  //   const loadConfig = async () => {
  //     try {
  //       const config = await getData('config');
  //       console.log(config);
  //       setCompanyName(config.customCompanyName);
  //       setIsUserSet(config.isUserSet);
  //     } catch (error) {
  //       console.log('Error loading Conig ..');
  //     }
  //   };
  //   loadConfig();

  //   setTimeout(() => {
  //     setShowSecondSplash(false);
  //   }, 2000);

  //   return () => {};
  // }, []);
  return (
    <UserConfigProvider>
      <AllQuestionsProvider>
        <AccessControllProvider>
          <ApplicationStartingPoint />
          {/* <StatusBar /> */}
          {/* <NavigationContainer>
            {showSecondSplash ? (
              <SecondSplashScreen />
            ) : (
              <Stack.Navigator>
                <>
                  <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={(params) => {
                      return {
                        ...headerStyles,
                        title: companyName,
                        headerRight: () => (
                          <AddButton
                            title={'+ '}
                            onPress={() =>
                              isUserSet
                                ? params.navigation.navigate('Admin')
                                : params.navigation.navigate('Setup')
                            }
                          />
                        ),
                      };
                    }}
                  />
                  <Stack.Screen
                    name="Admin"
                    component={Admin}
                    options={(params) => ({
                      ...headerStyles,
                      title: 'Admin',
                      headerRight: () => (
                        <AddButton
                          title={'⚙ '}
                          onPress={() => params.navigation.navigate('Setup')}
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
                    options={{ ...headerStyles, title: 'Questioner' }}
                  />
                </>
              </Stack.Navigator>
            )}
          </NavigationContainer> */}
        </AccessControllProvider>
      </AllQuestionsProvider>
    </UserConfigProvider>
  );
}

function AddButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      underlayColor="#fff"
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
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
  headerTitleAlign: 'center',
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
    fontSize: 30,
  },
});
