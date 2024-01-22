import React, {useState} from 'react';
import {Badge, Input, Text} from '@rneui/base';
import ColorPickerModal from '@src/components/colorPickerModal';
import {Pressable, StyleSheet, View} from 'react-native';
import CollapseView from './CollapseView';

interface CustomizeStyleCardProps {
  webchatCustomize: any;
  onChangeCustomize: (key: string, value: string) => void;
}

interface ColorPickerState {
  isVisible: boolean;
  key: string;
  title: string;
}
const CustomizeStyleCard: React.FC<CustomizeStyleCardProps> = ({
  webchatCustomize,
  onChangeCustomize,
}) => {
  const [colorPickerStates, setColorPickerStates] = useState<
    ColorPickerState[]
  >([
    {isVisible: false, key: 'headerColor', title: 'Header Color'},
    {isVisible: false, key: 'bottomColor', title: 'Bottom Color'},
    {isVisible: false, key: 'incomingTextColor', title: 'Incoming Text Color'},
    {isVisible: false, key: 'outgoingTextColor', title: 'Outgoing Text Color'},
    {isVisible: false, key: 'messageColor', title: 'Message Color'},
    {isVisible: false, key: 'messageBoxColor', title: 'Message Box Color'},
  ]);

  const handleColorPickerToggle = (index: string) => {
    const indexToUpdate = colorPickerStates.findIndex(
      colorPicker => colorPicker.key === index,
    );

    if (indexToUpdate !== -1) {
      const updatedStates = [...colorPickerStates];

      updatedStates[indexToUpdate] = {
        ...updatedStates[indexToUpdate],
        isVisible: true,
      };

      setColorPickerStates(updatedStates);
    }
  };

  return (
    <>
      <View style={styles.line} />

      <CollapseView header="HEADER">
        <View style={styles.padding}>
          <Text style={styles.text}>Header Color</Text>
          <Pressable
            style={{display: 'flex'}}
            onPress={() => handleColorPickerToggle('headerColor')}>
            <Text
              h4
              h4Style={{color: webchatCustomize.headerColor, fontSize: 22}}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.headerColor,
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.headerColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Header Text</Text>
          <Input
            placeholder="Header Text"
            value={webchatCustomize.headerText}
            onChangeText={value => onChangeCustomize('headerText', value)}
            style={{color: '#EC008C'}}
          />
        </View>
      </CollapseView>
      <View style={styles.line} />

      <CollapseView header="BOTTOM">
        <View style={styles.padding}>
          <Text style={styles.text}>Bottom Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('bottomColor')}>
            <Text
              h4
              h4Style={{color: webchatCustomize.bottomColor, fontSize: 22}}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.bottomColor,
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.bottomColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Bottom Text</Text>
          <Input
            placeholder="Bottom Text"
            style={{color: '#EC008C'}}
            value={webchatCustomize.bottomText}
            onChangeText={value => onChangeCustomize('bottomText', value)}
          />
        </View>
      </CollapseView>
      <View style={styles.line} />

      <CollapseView header="INCOMING">
        <View style={styles.padding}>
          <Text style={styles.text}>Incoming Text Color</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('incomingTextColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.incomingTextColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.incomingTextColor,
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.incomingTextColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Incoming Text</Text>
          <Input
            placeholder="Incoming Text"
            value={webchatCustomize.incomingText}
            onChangeText={value => onChangeCustomize('incomingText', value)}
            style={{color: '#EC008C'}}
          />
        </View>
      </CollapseView>
      <View style={styles.line} />
      <CollapseView header="OUTING">
        <View style={styles.padding}>
          <Text style={styles.text}>Outgoing Text Color</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('outgoingTextColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.outgoingTextColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.outgoingTextColor,
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.outgoingTextColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Outgoing Text</Text>
          <Input
            placeholder="Outgoing Text"
            value={webchatCustomize.outgoingText}
            onChangeText={value => onChangeCustomize('outgoingText', value)}
            style={{color: '#EC008C'}}
          />
        </View>
      </CollapseView>
      <View style={styles.line} />

      <CollapseView header="MESSAGE">
        <View style={styles.padding}>
          <Text style={styles.text}>Message Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('messageColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.messageColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.messageColor,
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.messageColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Message Box Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('messageBoxColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.messageBoxColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.messageBoxColor,
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.messageBoxColor}
            </Text>
          </Pressable>
        </View>
      </CollapseView>
      {colorPickerStates.map((colorPicker, index) => (
        <>
          <ColorPickerModal
            state={colorPickerStates}
            index={index}
            color={webchatCustomize[colorPicker.key]}
            setIsVisible={setColorPickerStates}
            saveColor={(color: string) =>
              onChangeCustomize(colorPicker.key, color)
            }
          />
        </>
      ))}
      <View style={styles.line} />
    </>
  );
};

export default CustomizeStyleCard;
const styles = StyleSheet.create({
  text: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
  },
  padding: {
    padding: 8,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#DFE0E6',
    alignSelf: 'stretch',
  },
});
