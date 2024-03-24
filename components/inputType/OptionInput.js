import { FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Actionsheet, Center } from 'native-base';

export default RenderActionList = ({ qitem, handleSelect }) => {
  const ww = Dimensions.get('window').width;
  const [hoveredItem, setHoveredItem] = useState('');

  const handlePressIn = (item) => {
    setHoveredItem(item);
  };
  const handlePressOut = () => {
    setHoveredItem('');
  };

  const optionRender = ({ item }) => {
    const isHovered = hoveredItem === item;

    return (
      <Actionsheet.Item
        onPress={() => {
          handleSelect(item);
        }}
        _hover={{ backgroundColor: 'lightgreen' }}
        borderColor={isHovered ? 'lightblue' : 'transparent'}
        borderWidth={1}
        onPressIn={() => {
          handlePressIn(qitem);
        }}
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
    <Center>
      <FlatList
        // style={styles.list}
        data={qitem.options}
        renderItem={optionRender}
        keyExtractor={(item, index) => index.toString() + item.toString()}
      />
    </Center>
  );
};
