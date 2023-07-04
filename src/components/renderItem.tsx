import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Input} from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputItem {
  key: string;
  value: string;
}

interface InputListProps {
  inputList: InputItem[];
  onRemoveInput: (index: number) => void;
}
const InputList: React.FC<InputListProps> = ({
  inputList,
  onRemoveInput,
}) => {
  const renderItem = (input: InputItem, index: number) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: 'white',
          bottom: 0,
          padding: 8,
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'row', width: '94%'}}>
          <View style={{flex: 3, paddingHorizontal: 2}}>
            <Input
              value={input.key}
            />
          </View>
          <View style={{flex: 3, paddingHorizontal: 2}}>
            <Input
              value={input.value}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => onRemoveInput(index)}>
          <Ionicons name="remove-outline" size={26} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{margin: 10}}>
      {inputList.map((input, index) => renderItem(input, index))}
    </View>
  );
};

export default InputList;
