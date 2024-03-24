import { StyleSheet, Dimensions } from 'react-native';
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
import RenderActionList from './inputType/OptionInput';
import RenderTextInput from './inputType/TextInput';

export default function InputRender(props) {
  const ww = Dimensions.get('window').width;
  const wh = Dimensions.get('window').height;
  const { item, setAnswer, answer, scroll, index } = props;
  const qItem = item;
  const { isOpen, onOpen, onClose } = useDisclose();
  const [inputValue, setInputValue] = useState(
    answer[qItem.label] || 'Answer Here...'
  );

  const handleSelect = (item) => {
    setAnswer({ ...answer, [qItem.label]: item });
    scroll(index);
    setInputValue(item);
    onClose();
  };
  const InputSwitch = (item) => {
    switch (item.type) {
      case 'option':
        return <RenderActionList qitem={item} handleSelect={handleSelect} />;
      case 'text':
        return (
          <RenderTextInput
            qitem={item}
            handleSelect={handleSelect}
            answer={answer}
          />
        );
      default:
        break;
    }
  };
  return (
    <Box
      style={[{ justifyContent: 'space-between' }, { marginBottom: 20 }]}
      borderBottomStyle="solid"
      borderBottomWidth={1.3}
      borderBottomColor="gray.300"
      borderRadius={35}
    >
      <NativeBaseProvider>
        <Text textAlign={'center'} margin={1} fontWeight={'bold'}>
          {qItem.text}
        </Text>
        <Center padding={2}>
          <Button
            w={ww * 0.8}
            backgroundColor={
              inputValue === 'Answer Here...' ? 'gray.500' : 'teal.600'
            }
            onPress={onOpen}
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
                  minH={wh}
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
                  {InputSwitch(qItem)}
                </Actionsheet.Content>
              </Center>
            </Box>
          </Actionsheet>
        </Center>
      </NativeBaseProvider>
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
