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
      //  if (data.h !== 0 && data.s !== 0 && data.v !== 0) {
        //  setStateColor(data);
      //  }
      setStateColor(data)
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
      <View
        style={{
          paddingTop:10,
          paddingBottom:40,
          paddingHorizontal:30,
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}>
        <View style={styles.badgeView}>
          <Text style={{...styles.text,   textAlign:'left'}}>{state[index].title} :</Text>
          <Input
            placeholder="Header Text"
            leftIcon={{
              type: 'font-awesome',
              name: 'hashtag',
              size: 16,
              color: 'gray',
            }}
            value={colorText?.replace('#', '')}
            onChangeText={changeText}
            testID={'adder-input'}
            style={{width: '10%'}}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TriangleColorPicker
            oldColor={color}
            color={stateColor}
            onColorChange={color => {
              setStateColor(color);
            }}
            style={{
              width: Dimensions.get('window').width - 80,
              height: 300,
            }}
          />
        
        </View>
        <View style={{...styles.badgeView, marginTop:10}}>
            <Text style={{...styles.text, textAlign:'center'}}>Old Color</Text>
            <Text style={{...styles.text, textAlign:'center'}}>New Color</Text>
          </View>

        <Button
          color={'#7f81ae'}
          title={'SAVE'}
          style={{marginTop: 40}}
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
  badgeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
    width: '50%',
  
  },
});

export default ColorPickerModal;
