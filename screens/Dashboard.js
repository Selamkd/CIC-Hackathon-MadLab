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
      <Text style={styles.text}>Sign up for a workshop</Text>
      <View style={styles.iconList}>
        <DashboardIcon
          navigation={navigation}
          payload={'question1'}
          title={'Decorate Your Own Money Box'}
          description={
            'Join us at Offerton Library on Mon Feb 12, 2024 at 10:30 AM for a fun-filled event where you can unleash your creativity and personalise your very own money box!'
          }
        ></DashboardIcon>

        <DashboardIcon
          navigation={navigation}
          style={styles.icon}
          payload={'question2'}
          title={'Talk about money CIC'}
          description={
            'Come and join us at our supportive, friendly peer support group. You can get specialist guidance from the group facilitator, share tips with others, and most importantly get help to make a plan and then follow that plan, step by step.'
          }
        ></DashboardIcon>

        <DashboardIcon
          style={styles.icon}
          navigation={navigation}
          payload={'question3'}
          title={'Financial inclusion'}
          description={
            'Join us at Main Street Community Center on Sat Mar 15, 2024 at 2:00 PM for an enlightening workshop on financial inclusion.'
          }
        ></DashboardIcon>
      </View>
      <Text
        onPress={() => {
          setRef(!ref);
          console.log(listAllSessionForms);
        }}
      ></Text>
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
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 17,
    color: '#013220',
    fontWeight: 'bold',
  },
});
