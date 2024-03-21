import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import {
  Button,
  Actionsheet,
  useDisclose,
  Box,
  Text,
  Center,
} from 'native-base';
// export const renderQuestionItem = ({ item, setAnswer, answer }) => {
//   //answer = new input
//   const handleAnswerChange = (selectedAnswer) => {
//     setAnswer((prevAnswers) => ({
//       ...prevAnswers,
//       [item.text]: selectedAnswer,
//     }));
//   };
//   return (
//     <View style={styles.questionItem}>
//       <Text style={styles.questionText}>{item.text}</Text>
//       <TextInput
//         style={styles.answerInput}
//         placeholder="Your answer"
//         onChangeText={(text) => handleAnswerChange(item.text, text)}
//       />
//     </View>
//   );
// };

export default function DropdownInput(props) {
  const { item, setAnswer, answer } = props;
  const qItem = item;
  const ww = Dimensions.get('window').width;
  const wh = Dimensions.get('window').height;
  const { isOpen, onOpen, onClose } = useDisclose();
  const [hoveredItem, setHoveredItem] = useState('');
  console.log('im inn', qItem);

  const handlePressIn = (item) => {
    setHoveredItem(item);
  };

  const handlePressOut = () => {
    setHoveredItem('');
  };

  const handleSelect = (item) => {
    console.log('select: ', item);
    setInputValue(item);
    setAnswer((prev) => ({ ...prev, [qItem.label]: item }));
    onClose();
  };
  const [inputValue, setInputValue] = useState('...Select you answer...');
  const renderItem = ({ item }) => {
    const isHovered = hoveredItem === item;
    console.log('survayLogs', answer);
    return (
      <Actionsheet.Item
        onPress={() => handleSelect(item)}
        _hover={{ backgroundColor: 'lightgreen' }}
        borderColor={isHovered ? 'lightblue' : 'transparent'}
        borderWidth={1}
        onPressIn={() => handlePressIn(qItem)}
        onPressOut={handlePressOut}
        w={ww * 0.95}
        mb={2}
        pl={10}
        p={2}
        justifyContent={'center'}
      >
        {`${item}`}
      </Actionsheet.Item>
    );
  };

  return (
    <Box
      style={[{ justifyContent: 'space-between' }, { marginBottom: 20 }]}
      borderBottomStyle="solid"
      borderBottomWidth={1.3}
      borderBottomColor="gray.300"
      borderRadius={35}
    >
      <Text textAlign={'center'} margin={1} fontWeight={'bold'}>
        {qItem.text}
      </Text>
      <Center padding={2}>
        <Button
          w={ww * 0.8}
          backgroundColor={
            inputValue === '...Select you answer...' ? 'gray.500' : 'teal.600'
          }
          onPress={onOpen}
          onPressOut={() => {}}
        >
          {inputValue}
        </Button>
        <Actionsheet
          isOpen={isOpen}
          hideDragIndicator
          borderTopRadius={20}
          disableOverlay
        >
          <Box>
            <Center>
              <Actionsheet.Content
                w={ww}
                borderTopRadius={20}
                bg={'#eff8ff'}
                p={0}
                pb={150}
                mh={wh * 0.87}
              >
                <Box
                  p={5}
                  borderTopRadius={10}
                  bg={'#eff8e9'}
                  w={'100%'}
                  mb={5}
                >
                  <Text
                    textAlign="center"
                    fontSize="16"
                    color="black"
                    p={3}
                    _dark={{ color: 'black.300' }}
                    fontWeight={'bold'}
                  >
                    {item.text}
                  </Text>
                </Box>
                <Center>
                  <FlatList
                    style={styles.list}
                    data={qItem.options}
                    renderItem={({ item }) => renderItem({ item })}
                    keyExtractor={(item, index) =>
                      index.toString() + item.toString()
                    }
                  />
                </Center>
              </Actionsheet.Content>
            </Center>
          </Box>
        </Actionsheet>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({
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
