import React, {useEffect, useState} from 'react';
import {BottomSheet, Button, Input, Text} from '@rneui/themed';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TriangleColorPicker, fromHsv, toHsv} from 'react-native-color-picker';
import {HsvColor} from 'react-native-color-picker/dist/typeHelpers';

type ColorPickerModalProps = {
  index: number;
  setIsVisible: React.Dispatch<React.SetStateAction<any>>;
  color: string;
  saveColor: (color: string) => void;
  state: any;
};

const ColorPickerModal: React.FunctionComponent<ColorPickerModalProps> = ({
  setIsVisible,
  color,
  saveColor,
  state,
  index,
}) => {
  const [stateColor, setStateColor] = useState<HsvColor>(toHsv(color));
  const [colorText, setColorText] = useState<string>(color);

  useEffect(() => {
    const text = fromHsv(stateColor);
    if (text !== colorText) {
      setColorText(text);
    }
  }, [stateColor]);

  const changeText = (value: string) => {
    if (value.length > 5) {
      var data = toHsv('#' + value);
      if (data.h !== 0 && data.s !== 0 && data.v !== 0) {
        setStateColor(data);
      }
    }
    setColorText('#' + value);
  };
  const closeHanddle = () => {
    const updatedStates = [...state];
    updatedStates[index] = {
      ...updatedStates[index],
      isVisible: false,
    };
    setIsVisible(updatedStates);
  };

  return (
    <BottomSheet
      scrollViewProps={{scrollEnabled: false}}
      modalProps={{}}
      isVisible={state[index].isVisible}
      onBackdropPress={() => closeHanddle()}>
      <View style={{flex: 1, padding: 45, backgroundColor: '#fff'}}>
        <Text h4 h4Style={{textAlign: 'center'}}>
          {state[index].title}
        </Text>
        <TriangleColorPicker
          oldColor={color}
          color={stateColor}
          onColorChange={color => {
            setStateColor(color);
          }}
          style={{width: Dimensions.get('window').width - 80, height: 400}}
        />
        <Input
          placeholder="Header Text"
          leftIcon={{type: 'font-awesome', name: 'hashtag', size: 16}}
          value={colorText?.replace('#', '')}
          onChangeText={changeText}
          testID={'adder-input'}
        />
        <Button
          color={'#7f81ae'}
          title={'SAVE'}
          onPress={() => {
            closeHanddle();
            saveColor(fromHsv(stateColor));
          }}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default ColorPickerModal;
