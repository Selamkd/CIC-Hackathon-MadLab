import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { getData, storeData } from '../utils/AsyncStorage';

import DashboardIcon from '../components/DashboadIcon';

export default function Dashboard({ navigation }) {
  const [listAllSessionForms, setListAllQuestionForms] = useState([]);
  const [ref, setRef] = useState(true);

  useEffect(() => {
    console.log('lodingDB');
    getData('sessionForms')
      .then((data) =>
        data
          ? console.log(data, ' DASH') || setListAllQuestionForms(data)
          : console.log(data, 'falisy DB load')
      )
      .catch((er) => console.log(er));
  }, [ref]);

  return (
    <View style={styles.container}>
      <View style={styles.iconList}>
        <DashboardIcon
          navigation={navigation}
          payload={'question1'}
          style={styles.iconShadow}
          title={'WorkShop 1'}
        ></DashboardIcon>
        <DashboardIcon
          navigation={navigation}
          payload={'question2'}
          title={'WorkShop 2'}
        ></DashboardIcon>
        <DashboardIcon
          navigation={navigation}
          payload={'question3'}
          title={'WorkShop 3'}
        ></DashboardIcon>
      </View>
      <Text
        onPress={() => {
          setRef(!ref);
          console.log(listAllSessionForms);
        }}
      >
        Consolelog
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    justifyContent: 'center',
  },
  iconList: {
    gap: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
