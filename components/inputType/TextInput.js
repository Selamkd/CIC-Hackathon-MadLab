import { Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Actionsheet, Input, Box } from 'native-base';

export default RenderTextInput = ({ qitem, handleSelect, answer }) => {
  const ww = Dimensions.get('window').width;
  const [textInputState, setTextInputState] = useState(
    answer[qitem.label] || 'Answer Here...'
  );
  return (
    <Actionsheet.Item>
      <Box alignItems="center" w={ww * 0.9}>
        <Input
          placeholder={textInputState}
          value={textInputState}
          onFocus={() => {
            textInputState === 'Answer Here...' && setTextInputState('');
          }}
          onEndEditing={() => {
            handleSelect(textInputState || 'Answer Here...');
            setTextInputState('Answer Here...');
          }}
          onChangeText={(text) => setTextInputState(text)}
          size="lg"
        ></Input>
      </Box>
    </Actionsheet.Item>
  );
};
