import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

import DashboardIcon from '../components/DashboadIcon';

export default function Dashboard({payload, navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.iconList}>
        <DashboardIcon
          style={styles.iconShadow}
          title={'WorkShop 1'}
        ></DashboardIcon>
        <DashboardIcon navigation ={navigation} payload = {"question1"} title={'WorkShop 2'}></DashboardIcon>
        <DashboardIcon title={'WorkShop 1'}></DashboardIcon>
        <DashboardIcon title={'WorkShop 2'}></DashboardIcon>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51ad63',
    justifyContent: 'center',
  },
  iconList: {
    gap: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
