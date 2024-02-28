import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function DashboardIcon({title, navigation, payload}) {
  
  return (
        <TouchableOpacity style={styles.iconShadow} onPress={()=>navigation.navigate('Questioner',{payload})}>
    <View style={styles.container}>

      <Text>
        {title}
      </Text>
    </View>
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF60',
    
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:2,
    borderColor:'#00968360',
    borderRadius:25,
    padding:10,
    width: 200,
    height: 200,   
     },
     iconShadow:{
        shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    
    elevation:10,}
});
