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
  id:number;
  isVisible: boolean;
  key: string;
  title: string;
}
const CustomizeStyleCard: React.FC<CustomizeStyleCardProps> = ({
  webchatCustomize,
  onChangeCustomize,
}) => {
  const [colorPickerStates, setColorPickerStates] = useState<ColorPickerState[]>(
    [
      { id: 1, isVisible: false, key: 'headerColor', title: 'Header Color' },
      { id: 2, isVisible: false, key: 'headerTextColor', title: 'Header Text Color' },
      { id: 3, isVisible: false, key: 'bottomColor', title: 'Bottom Color' },
      { id: 4, isVisible: false, key: 'bottomInputBorderColor', title: 'Bottom Input Border Color' },
      { id: 5, isVisible: false, key: 'bottomInputSendButtonColor', title: 'Bottom Input Send Button Color' },
      { id: 6, isVisible: false, key: 'userMessageBoxBackground', title: 'User Message Box Background' },
      { id: 7, isVisible: false, key: 'userMessageBoxTextColor', title: 'User Message Text Color' },
      { id: 8, isVisible: false, key: 'chatBotMessageBoxBackground', title: 'Chat Bot Message Box Background' },
      { id: 9, isVisible: false, key: 'chatBotMessageBoxTextColor', title: 'Chat Bot Message Box Text Color' },
      { id: 10, isVisible: false, key: 'chatBotMessageBoxHeaderNameColor', title: 'Chat Bot Message Box Header Name Color' },
      { id: 11, isVisible: false, key: 'chatBotMessageBoxButtonBackground', title: 'Chat Bot Message Box Button Background' },
      { id: 12, isVisible: false, key: 'chatBotMessageBoxButtonTextColor', title: 'Chat Bot Message Box Button Text Color' },
      { id: 13, isVisible: false, key: 'chatBotMessageBoxButtonBorderColor', title: 'Chat Bot Message Box Button Border Color' },
      { id: 14, isVisible: false, key: 'chatBody', title: 'Chat Body' },
      { id: 15, isVisible: false, key: 'sliderMaximumTrackTintColor', title: 'Slider Maximum Track Tint Color' },
      { id: 16, isVisible: false, key: 'sliderThumbTintColor', title: 'Slider Thumb Tint Color' },
      { id: 17, isVisible: false, key: 'sliderMinimumTrackTintColor', title: 'Slider Minimum Track Tint Color' },
      { id: 18, isVisible: false, key: 'cmsTextColor', title: 'Close Modal Text Color' },
      { id: 19, isVisible: false, key: 'cmsBackground', title: 'Close Modal Background Color' },
      { id: 20, isVisible: false, key: 'cmsYesButtonTextColor', title: 'Close Modal Yes Button Text Color' },
      { id: 21, isVisible: false, key: 'cmsYesButtonBackground', title: 'Close Modal Yes Button Background' },
      { id: 22, isVisible: false, key: 'cmsYesButtonBorderColor', title: 'Close Modal Yes Button Border Color' },
      { id: 23, isVisible: false, key: 'cmsNoButtonTextColor', title: 'Close Modal No Button Text Color' },
      { id: 24, isVisible: false, key: 'cmsNoButtonBackground', title: 'Close Modal No Button Background' },
      { id: 25, isVisible: false, key: 'cmsNoButtonBorderColor', title: 'Close Modal No Button Border Color' },
    ]
  );

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
                  borderColor:"black", borderWidth:1,
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
        <View style={styles.padding}>
          <Text style={styles.text}>Header Text Color</Text>
          <Pressable
            style={{display: 'flex'}}
            onPress={() => handleColorPickerToggle('headerTextColor')}>
            <Text
              h4
              h4Style={{color: webchatCustomize.headerTextColor, fontSize: 22}}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.headerTextColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.headerTextColor}
            </Text>
          </Pressable>
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
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.bottomColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Bottom Input Text</Text>
          <Input
            placeholder="Bottom Text"
            style={{color: '#EC008C'}}
            value={webchatCustomize.bottomInputText}
            onChangeText={value => onChangeCustomize('bottomInputText', value)}
          />
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Bottom Input Border Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('bottomInputBorderColor')}>
            <Text
              h4
              h4Style={{color: webchatCustomize.bottomInputBorderColor, fontSize: 22}}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.bottomInputBorderColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.bottomInputBorderColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Bottom Input Send Button Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('bottomInputSendButtonColor')}>
            <Text
              h4
              h4Style={{color: webchatCustomize.bottomInputSendButtonColor, fontSize: 22}}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.bottomInputSendButtonColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.bottomInputSendButtonColor}
            </Text>
          </Pressable>
        </View>
      </CollapseView>
      <View style={styles.line} />

      <CollapseView header="USER MESSAGE BOX">
        <View style={styles.padding}>
          <Text style={styles.text}>User Message Box Background</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('userMessageBoxBackground')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.userMessageBoxBackground,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.userMessageBoxBackground,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.userMessageBoxBackground}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>User Message Box Text Color</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('userMessageBoxTextColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.userMessageBoxTextColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.userMessageBoxTextColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.userMessageBoxTextColor}
            </Text>
          </Pressable>
        </View>
      </CollapseView>
      <View style={styles.line} />
      <CollapseView header="BOT MESSAGE BOX ">
        <View style={styles.padding}>
          <Text style={styles.text}>Chat Bot Message Box Background</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('chatBotMessageBoxBackground')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.chatBotMessageBoxBackground,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.chatBotMessageBoxBackground,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.chatBotMessageBoxBackground}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Chat Bot Message Box Text Color</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('chatBotMessageBoxTextColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.chatBotMessageBoxTextColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.chatBotMessageBoxTextColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.chatBotMessageBoxTextColor}
            </Text>
          </Pressable>
        </View>
         <View style={styles.padding}>
          <Text style={styles.text}>Chat Bot Message Box Icon</Text>
          <Input
            placeholder="Chat Bot Message Box Icon"
            value={webchatCustomize.chatBotMessageBoxIcon}
            onChangeText={value => onChangeCustomize('chatBotMessageBoxIcon', value)}
            style={{color: '#EC008C'}}
          />
        </View>
        {/* <View style={styles.padding}>
          <Text style={styles.text}>Chat Bot Message Box Header Name</Text>
          <Input
            placeholder="Chat Bot Message Box Header Name"
            value={webchatCustomize.chatBotMessageBoxHeaderName}
            onChangeText={value => onChangeCustomize('chatBotMessageBoxHeaderName', value)}
            style={{color: '#EC008C'}}
          />
        </View> */}
        {/* <View style={styles.padding}>
          <Text style={styles.text}>Chat Bot Message Box Header Name Color</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('chatBotMessageBoxHeaderNameColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.chatBotMessageBoxHeaderNameColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.chatBotMessageBoxHeaderNameColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.chatBotMessageBoxHeaderNameColor}
            </Text>
          </Pressable>
        </View> */}
       
      </CollapseView>
      <View style={styles.line} />

      <CollapseView header="CHAT BODY">
        <View style={styles.padding}>
          <Text style={styles.text}>Chat Body</Text>
          <Pressable onPress={() => handleColorPickerToggle('chatBody')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.chatBody,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.chatBody,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.chatBody}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Chat Bot Message Box Button Background</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('chatBotMessageBoxButtonBackground')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.chatBotMessageBoxButtonBackground,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.chatBotMessageBoxButtonBackground,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.chatBotMessageBoxButtonBackground}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Chat Bot Message Box Button Text Color</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('chatBotMessageBoxButtonTextColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.chatBotMessageBoxButtonTextColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.chatBotMessageBoxButtonTextColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.chatBotMessageBoxButtonTextColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Chat Bot Message Box Button Border Color</Text>
          <Pressable
            onPress={() => handleColorPickerToggle('chatBotMessageBoxButtonBorderColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.chatBotMessageBoxButtonBorderColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.chatBotMessageBoxButtonBorderColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.chatBotMessageBoxButtonBorderColor}
            </Text>
          </Pressable>
        </View>
      </CollapseView>
      <View style={styles.line} />

      <CollapseView header="AUDIO SLIDER">
        <View style={styles.padding}>
          <Text style={styles.text}>Slider Maximum Track Tint Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('sliderMaximumTrackTintColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.sliderMaximumTrackTintColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.sliderMaximumTrackTintColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.sliderMaximumTrackTintColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Slider Thumb Tint Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('sliderThumbTintColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.sliderThumbTintColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.sliderThumbTintColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.sliderThumbTintColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Slider Minimum Track Tint Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('sliderMinimumTrackTintColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.sliderMinimumTrackTintColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.sliderMinimumTrackTintColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.sliderMinimumTrackTintColor}
            </Text>
          </Pressable>
        </View>
      </CollapseView>
      <View style={styles.line} />

      <CollapseView header="CLOSE MODAL">
      <View style={styles.padding}>
          <Text style={styles.text}>Close Modal Text</Text>
          <Input
            placeholder="Close Modal Text"
            value={webchatCustomize.cmsText}
            onChangeText={value => onChangeCustomize('cmsText', value)}
            style={{color: '#EC008C'}}
          />
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal Text Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('cmsTextColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.cmsTextColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.cmsTextColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.cmsTextColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal Background</Text>
          <Pressable onPress={() => handleColorPickerToggle('cmsBackground')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.cmsBackground,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.cmsBackground,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.cmsBackground}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal Yes Text</Text>
          <Input
            placeholder="Yes"
            value={webchatCustomize.cmsYesButtonText}
            onChangeText={value => onChangeCustomize('cmsYesButtonText', value)}
            style={{color: '#EC008C'}}
          />
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal Yes Button Text Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('cmsYesButtonTextColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.cmsYesButtonTextColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.cmsYesButtonTextColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.cmsYesButtonTextColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal Yes Button Background</Text>
          <Pressable onPress={() => handleColorPickerToggle('cmsYesButtonBackground')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.cmsYesButtonBackground,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.cmsYesButtonBackground,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.cmsYesButtonBackground}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal Yes Button Border Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('cmsYesButtonBorderColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.cmsYesButtonBorderColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.cmsYesButtonBorderColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.cmsYesButtonBorderColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal No Button Text</Text>
          <Input
            placeholder="No"
            value={webchatCustomize.cmsNoButtonText}
            onChangeText={value => onChangeCustomize('cmsNoButtonText', value)}
            style={{color: '#EC008C'}}
          />
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal No Button Text Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('cmsNoButtonTextColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.cmsNoButtonTextColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.cmsNoButtonTextColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.cmsNoButtonTextColor}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal No Button Background</Text>
          <Pressable onPress={() => handleColorPickerToggle('cmsNoButtonBackground')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.cmsNoButtonBackground,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.cmsNoButtonBackground,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.cmsNoButtonBackground}
            </Text>
          </Pressable>
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>Close Modal No Button Border Color</Text>
          <Pressable onPress={() => handleColorPickerToggle('cmsNoButtonBorderColor')}>
            <Text
              h4
              h4Style={{
                color: webchatCustomize.cmsNoButtonBorderColor,
                fontSize: 22,
              }}>
              <Badge
                containerStyle={{paddingLeft: 8, paddingTop: 8}}
                badgeStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: webchatCustomize.cmsNoButtonBorderColor,
                  borderColor:"black", borderWidth:1
                }}></Badge>
              &nbsp;&nbsp;
              {webchatCustomize.cmsNoButtonBorderColor}
            </Text>
          </Pressable>
        </View>
      </CollapseView>

      <CollapseView header="USE ND">
      <View style={styles.padding}>
          <Text style={styles.text}>Use ND Channel</Text>
          <Input
            placeholder="Use ND Channel"
            value={webchatCustomize.channel}
            onChangeText={value => onChangeCustomize('channel', value)}
            style={{color: '#EC008C'}}
          />
        </View>
       
      </CollapseView>
      {colorPickerStates.map((colorPicker, index) => (
           <ColorPickerModal
            key={colorPicker.id}
            state={colorPickerStates}
            index={index}
            color={webchatCustomize[colorPicker.key]}
            setIsVisible={setColorPickerStates}
            saveColor={(color: string) =>
              onChangeCustomize(colorPicker.key, color)
            }
          />
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
