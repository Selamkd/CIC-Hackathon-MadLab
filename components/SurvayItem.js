import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  Button,
  Actionsheet,
  useDisclose,
  Box,
  Text,
  Center,
  NativeBaseProvider,
} from 'native-base';
export const renderQuestionItem = ({ item }) => (
  <View style={styles.questionItem}>
    <Text style={styles.questionText}>{item.text}</Text>
    <TextInput
      style={styles.answerInput}
      placeholder="Your answer"
      onChangeText={(text) => handleAnswerChange(item.text, text)}
    />
  </View>
);

export const renderOpionQuestionItem = ({ list }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const List = ['del', 'insr', 'lorem', 'epsum'];

  const [hoveredItem, setHoveredItem] = useState('');

  //   const handlePressIn = (item: string) => {
  //     setHoveredItem(item);
  //   };

  //   const handlePressOut = () => {
  //     setHoveredItem("");
  //   };

  const handleSelect = (item, setAnswer) => {
    console.log(item);
    onClose(); // Close the actionsheet after selecting an item
  };

  const renderItem = ({ item }, handleSelect) => {
    const isHovered = hoveredItem === item;

    return (
      <Center>
        <Actionsheet.Item
          onPress={() => handleSelect(item)}
          margin={3}
          padding={2}
          borderColor={isHovered ? 'lightblue' : 'gray'}
          borderWidth={1}
          // onPressIn={() => handlePressIn(item)}
          // onPressOut={handlePressOut}
        >
          {item}
        </Actionsheet.Item>
      </Center>
    );
  };

  return (
    <Center>
      <Button onPress={onOpen}>Open Actionsheet</Button>
      <Actionsheet isOpen={isOpen} hideDragIndicator justifyContent="center">
        <Box width="60%">
          <Actionsheet.Content
            borderRadius={20}
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <Box
              w="100%"
              h={80}
              px={4}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{ color: 'gray.300' }}
              >
                Albums
              </Text>
            </Box>
            <FlatList
              data={list}
              renderItem={({ item }) => renderItem({ item }, setAnswer)}
              keyExtractor={(item, index) => index.toString()}
            />
          </Actionsheet.Content>
        </Box>
      </Actionsheet>
    </Center>
  );
};

const styles = StyleSheet.ceate({
  questionItem: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
    borderRadius: 5,
  },
});
