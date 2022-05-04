import { Text } from 'native-base';
import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { SelectContext } from './Select';


const SelectItem = ({ label, value }) => {
  const { selectedValue, onValueChange, _selectedItem, _item } =
    useContext(SelectContext);
  return (
    <Pressable onPress={() => onValueChange(label,value)}>
      <Text>{label}</Text>
    </Pressable>
  );
};

export default SelectItem;
