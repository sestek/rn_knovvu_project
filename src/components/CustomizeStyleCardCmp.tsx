import React, {useState} from 'react';
import {Badge, Input, Text, Button, Switch} from '@rneui/base';
import ColorPickerModal from '@src/components/colorPickerModal';
import {Pressable, StyleSheet, View} from 'react-native';
import CollapseView from './CollapseView';
import DropDownCmp from './DropDownCmp';
import FontSliderCmp from './FontSliderCmp';

interface CustomizeStyleCardProps {
  webchatCustomize: any;
  onChangeCustomize: (key: string, value: string) => void;
}

interface ColorPickerState {
  id: number;
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
    {id: 1, isVisible: false, key: 'headerColor', title: 'Header Color'},
    {
      id: 2,
      isVisible: false,
      key: 'headerTextColor',
      title: 'Header Text Color',
    },
    {id: 3, isVisible: false, key: 'bottomColor', title: 'Bottom Color'},
    {
      id: 4,
      isVisible: false,
      key: 'bottomInputBorderColor',
      title: 'Bottom Input Border Color',
    },
    {
      id: 5,
      isVisible: false,
      key: 'bottomInputSendButtonColor',
      title: 'Bottom Input Send Button Color',
    },
    {
      id: 6,
      isVisible: false,
      key: 'userMessageBoxBackground',
      title: 'User Message Box Background',
    },
    {
      id: 7,
      isVisible: false,
      key: 'userMessageBoxTextColor',
      title: 'User Message Text Color',
    },
    {
      id: 8,
      isVisible: false,
      key: 'chatBotMessageBoxBackground',
      title: 'Chat Bot Message Box Background',
    },
    {
      id: 9,
      isVisible: false,
      key: 'chatBotMessageBoxTextColor',
      title: 'Chat Bot Message Box Text Color',
    },
    {
      id: 10,
      isVisible: false,
      key: 'chatBotMessageBoxHeaderNameColor',
      title: 'Chat Bot Message Box Header Name Color',
    },
    {
      id: 11,
      isVisible: false,
      key: 'chatBotMessageBoxButtonBackground',
      title: 'Chat Bot Message Box Button Background',
    },
    {
      id: 12,
      isVisible: false,
      key: 'chatBotMessageBoxButtonTextColor',
      title: 'Chat Bot Message Box Button Text Color',
    },
    {
      id: 13,
      isVisible: false,
      key: 'chatBotMessageBoxButtonBorderColor',
      title: 'Chat Bot Message Box Button Border Color',
    },
    {id: 14, isVisible: false, key: 'chatBody', title: 'Chat Body'},
    {
      id: 15,
      isVisible: false,
      key: 'sliderMaximumTrackTintColor',
      title: 'Slider Maximum Track Tint Color',
    },
    {
      id: 16,
      isVisible: false,
      key: 'sliderThumbTintColor',
      title: 'Slider Thumb Tint Color',
    },
    {
      id: 17,
      isVisible: false,
      key: 'sliderMinimumTrackTintColor',
      title: 'Slider Minimum Track Tint Color',
    },
    {
      id: 18,
      isVisible: false,
      key: 'cmsTextColor',
      title: 'Close Modal Text Color',
    },
    {
      id: 19,
      isVisible: false,
      key: 'cmsBackground',
      title: 'Close Modal Background Color',
    },
    {
      id: 20,
      isVisible: false,
      key: 'cmsYesButtonTextColor',
      title: 'Close Modal Yes Button Text Color',
    },
    {
      id: 21,
      isVisible: false,
      key: 'cmsYesButtonBackground',
      title: 'Close Modal Yes Button Background',
    },
    {
      id: 22,
      isVisible: false,
      key: 'cmsYesButtonBorderColor',
      title: 'Close Modal Yes Button Border Color',
    },
    {
      id: 23,
      isVisible: false,
      key: 'cmsNoButtonTextColor',
      title: 'Close Modal No Button Text Color',
    },
    {
      id: 24,
      isVisible: false,
      key: 'cmsNoButtonBackground',
      title: 'Close Modal No Button Background',
    },
    {
      id: 25,
      isVisible: false,
      key: 'cmsNoButtonBorderColor',
      title: 'Close Modal No Button Border Color',
    },
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
  const [isDateFormatVisible, setDateFormatIsVisible] = useState(false);

  const listDateFormat = [
    {value: 'long', key: 'Long'},
    {value: 'short', key: 'Short'},
  ];

  const onCloseDateFormat = () => {
    setDateFormatIsVisible(false);
  };
  const onDoneDateFormat = async (item: string | null) => {
    if (item?.value) {
      onChangeCustomize('dateFormat', item?.value);
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {value: 'textToLeft', key: 'Text To Left'},
    {value: 'textToCenter', key: 'Text To Center'},
    {value: 'textToRight', key: 'Text To Right'},
  ];

  const onClose = () => {
    setIsVisible(false);
  };
  const onDone = async (item: string | null) => {
    if (item?.value) {
      onChangeCustomize('headerAlignmentType', item?.value);
    }
  };

  const handleSwitch = (val: any) => {
    onChangeCustomize('autoPlayAudio', val);
  };

  const handleSwitchUseLegacy = (val: any) => {
    onChangeCustomize('useLegacyProduct', val);
  };
  const handleSwitchChatBodyImage = (val: any) => {
    onChangeCustomize('chatBodyImage', val);
  };

  return (
    <>
      <CollapseView header="Customize Settings">
        <View style={styles.line} />

        <CollapseView header="HEADER">
          <View style={styles.badgeView}>
            <Text style={styles.text}>Header Color</Text>
            <Pressable
              style={{display: 'flex'}}
              onPress={() => handleColorPickerToggle('headerColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.headerColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Header Text Color</Text>
            <Pressable
              style={{display: 'flex'}}
              onPress={() => handleColorPickerToggle('headerTextColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.headerTextColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={{...styles.badgeView}}>
            <Text style={{...styles.text, width: '50%', marginRight: 10}}>
              Header Alignment Type
            </Text>
            <View style={{flex: 1}}>
              <DropDownCmp
                isVisible={isVisible}
                onClose={onClose}
                items={list}
                onDone={onDone}
                dropDownTitle="Header Alignment Type"
              />
              <Button
                title={
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.dropDownText}>
                      {list.find(
                        x => x?.value === webchatCustomize.headerAlignmentType,
                      )?.key || webchatCustomize.headerAlignmentType}
                    </Text>
                  </View>
                }
                buttonStyle={styles.dropDownButton}
                onPress={() => setIsVisible(true)}></Button>
            </View>
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
          <View style={styles.badgeView}>
            <Text style={styles.text}>Bottom Color</Text>
            <Pressable onPress={() => handleColorPickerToggle('bottomColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.bottomColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Bottom Input Border Color</Text>
            <Pressable
              onPress={() => handleColorPickerToggle('bottomInputBorderColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.bottomInputBorderColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Bottom Input Send Button Color</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('bottomInputSendButtonColor')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.bottomInputSendButtonColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.padding}>
            <Text style={styles.text}>Bottom Input Text</Text>
            <Input
              placeholder="Bottom Text"
              style={{color: '#EC008C'}}
              value={webchatCustomize.bottomInputText}
              onChangeText={value =>
                onChangeCustomize('bottomInputText', value)
              }
            />
          </View>
        </CollapseView>
        <View style={styles.line} />

        <CollapseView header="USER MESSAGE BOX">
          <View style={styles.badgeView}>
            <Text style={styles.text}>User Message Box Background</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('userMessageBoxBackground')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.userMessageBoxBackground,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>User Message Box Text Color</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('userMessageBoxTextColor')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.userMessageBoxTextColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.padding}>
            <Text style={styles.text}>User Message Box Icon</Text>
            <Input
              placeholder="User Message Box Icon"
              value={webchatCustomize.userMessageIcon}
              onChangeText={value =>
                onChangeCustomize('userMessageIcon', value)
              }
              style={{color: '#EC008C'}}
            />
          </View>
        </CollapseView>
        <View style={styles.line} />
        <CollapseView header="BOT MESSAGE BOX ">
          <View style={styles.badgeView}>
            <Text style={styles.text}>Chat Bot Message Box Background</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('chatBotMessageBoxBackground')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.chatBotMessageBoxBackground,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Chat Bot Message Box Text Color</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('chatBotMessageBoxTextColor')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.chatBotMessageBoxTextColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.padding}>
            <Text style={styles.text}>Chat Bot Message Box Icon</Text>
            <Input
              placeholder="Chat Bot Message Box Icon"
              value={webchatCustomize.chatBotMessageBoxIcon}
              onChangeText={value =>
                onChangeCustomize('chatBotMessageBoxIcon', value)
              }
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
          <View style={styles.badgeView}>
            <Text style={styles.text}>Chat Body</Text>
            <Pressable onPress={() => handleColorPickerToggle('chatBody')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.chatBody,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Use Chat Body Image</Text>
            <Switch
              value={webchatCustomize?.chatBodyImage}
              onValueChange={value => handleSwitchChatBodyImage(value)}
              style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}]}}
              color="#EC008C"
            />
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>ChatBot MBox Button Background</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('chatBotMessageBoxButtonBackground')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor:
                    webchatCustomize.chatBotMessageBoxButtonBackground,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>ChatBot MBox Button Text Color</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('chatBotMessageBoxButtonTextColor')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor:
                    webchatCustomize.chatBotMessageBoxButtonTextColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>ChatBot MBox Button Border Color</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('chatBotMessageBoxButtonBorderColor')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor:
                    webchatCustomize.chatBotMessageBoxButtonBorderColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.padding}>
            <FontSliderCmp
              webchatCustomize={webchatCustomize}
              onChangeCustomize={onChangeCustomize}
            />
          </View>

          <View style={{...styles.badgeView}}>
            <Text style={{...styles.text, width: '50%', marginRight: 10}}>
              Date Format Type
            </Text>
            <View style={{flex: 1}}>
              <DropDownCmp
                isVisible={isDateFormatVisible}
                onClose={onCloseDateFormat}
                items={listDateFormat}
                onDone={onDoneDateFormat}
                dropDownTitle="Date Format Type"
              />
              <Button
                title={
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.dropDownText}>
                      {listDateFormat.find(
                        x => x?.value === webchatCustomize?.dateFormat,
                      )?.key || webchatCustomize?.dateFormat}
                    </Text>
                  </View>
                }
                buttonStyle={styles.dropDownButton}
                onPress={() => setDateFormatIsVisible(true)}></Button>
            </View>
          </View>
        </CollapseView>
        <View style={styles.line} />

        <CollapseView header="AUDIO SLIDER">
          <View style={styles.badgeView}>
            <Text style={styles.text}>Bot Played Track Color</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('sliderMaximumTrackTintColor')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.sliderMaximumTrackTintColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Bot Unplayed Track Color</Text>
            <Pressable
              onPress={() => handleColorPickerToggle('sliderThumbTintColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.sliderThumbTintColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Bot Timer Text Color</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('sliderMinimumTrackTintColor')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.sliderMinimumTrackTintColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Automatic Audio Playback</Text>
            <Switch
              value={webchatCustomize?.autoPlayAudio}
              onValueChange={value => handleSwitch(value)}
              style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}]}}
              color="#EC008C"
            />
          </View>
        </CollapseView>

        <View style={styles.line} />

        <CollapseView header="CLOSE MODAL">
          <View style={styles.badgeView}>
            <Text style={styles.text}>Close Modal Text Color</Text>
            <Pressable onPress={() => handleColorPickerToggle('cmsTextColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.cmsTextColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Close Modal Background</Text>
            <Pressable onPress={() => handleColorPickerToggle('cmsBackground')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.cmsBackground,
                }}></Badge>
            </Pressable>
          </View>

          <View style={styles.badgeView}>
            <Text style={styles.text}>Close Modal Yes Button Text Color</Text>
            <Pressable
              onPress={() => handleColorPickerToggle('cmsYesButtonTextColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.cmsYesButtonTextColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Close Modal Yes Button Background</Text>
            <Pressable
              onPress={() => handleColorPickerToggle('cmsYesButtonBackground')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.cmsYesButtonBackground,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Close Modal Yes Button Border Color</Text>
            <Pressable
              onPress={() =>
                handleColorPickerToggle('cmsYesButtonBorderColor')
              }>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.cmsYesButtonBorderColor,
                }}></Badge>
            </Pressable>
          </View>

          <View style={styles.badgeView}>
            <Text style={styles.text}>Close Modal No Button Text Color</Text>
            <Pressable
              onPress={() => handleColorPickerToggle('cmsNoButtonTextColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.cmsNoButtonTextColor,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Close Modal No Button Background</Text>
            <Pressable
              onPress={() => handleColorPickerToggle('cmsNoButtonBackground')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.cmsNoButtonBackground,
                }}></Badge>
            </Pressable>
          </View>
          <View style={styles.badgeView}>
            <Text style={styles.text}>Close Modal No Button Border Color</Text>
            <Pressable
              onPress={() => handleColorPickerToggle('cmsNoButtonBorderColor')}>
              <Badge
                badgeStyle={{
                  ...styles.badgeStyle,
                  backgroundColor: webchatCustomize.cmsNoButtonBorderColor,
                }}></Badge>
            </Pressable>
          </View>
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
            <Text style={styles.text}>Close Modal Yes Text</Text>
            <Input
              placeholder="Yes"
              value={webchatCustomize.cmsYesButtonText}
              onChangeText={value =>
                onChangeCustomize('cmsYesButtonText', value)
              }
              style={{color: '#EC008C'}}
            />
          </View>
          <View style={styles.padding}>
            <Text style={styles.text}>Close Modal No Button Text</Text>
            <Input
              placeholder="No"
              value={webchatCustomize.cmsNoButtonText}
              onChangeText={value =>
                onChangeCustomize('cmsNoButtonText', value)
              }
              style={{color: '#EC008C'}}
            />
          </View>
        </CollapseView>

        {/* <CollapseView header="USE ND">
        <View style={styles.padding}>
          <Text style={styles.text}>Use ND Channel</Text>
          <Input
            placeholder="Use ND Channel"
            value={webchatCustomize.channel}
            onChangeText={value => onChangeCustomize('channel', value)}
            style={{color: '#EC008C'}}
          />
        </View>
      </CollapseView> */}
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
      </CollapseView>
      <CollapseView header="Other">
        <View style={styles.padding}>
          <Text style={styles.text}>Client ID</Text>
          <Input
            placeholder="Client ID"
            style={{color: '#EC008C'}}
            value={webchatCustomize?.clientId}
            onChangeText={value => onChangeCustomize('clientId', value)}
          />
        </View>
        <Text style={styles.text}>End User Information</Text>
        <View style={styles.padding}>
          <Text style={styles.text}>End User Name</Text>
          <Input
            placeholder="End User Name"
            style={{color: '#EC008C'}}
            value={webchatCustomize?.endUserName}
            onChangeText={value => onChangeCustomize('endUserName', value)}
          />
        </View>
        {/* <View style={styles.padding}>
          <Text style={styles.text}>End User Phone</Text>
          <Input
            placeholder="End User Phone"
            style={{color: '#EC008C'}}
            value={webchatCustomize?.endUserPhone}
            onChangeText={value => onChangeCustomize('endUserPhone', value)}
          />
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>End User Email</Text>
          <Input
            placeholder="End User Email"
            style={{color: '#EC008C'}}
            value={webchatCustomize?.endUserEmail}
            onChangeText={value => onChangeCustomize('endUserEmail', value)}
          />
        </View>
        <View style={styles.padding}>
          <Text style={styles.text}>End User Twitter</Text>
          <Input
            placeholder="End User Twitter"
            style={{color: '#EC008C'}}
            value={webchatCustomize?.endUserTwitter}
            onChangeText={value => onChangeCustomize('endUserTwitter', value)}
          />
        </View> */}
        <View style={styles.badgeView}>
          <Text style={styles.text}>Use Legacy Product</Text>
          <Switch
            value={webchatCustomize?.useLegacyProduct}
            onValueChange={value => handleSwitchUseLegacy(value)}
            style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}]}}
            color="#EC008C"
          />
        </View>
      </CollapseView>
    </>
  );
};

export default CustomizeStyleCard;
const styles = StyleSheet.create({
  badgeStyle: {
    height: 24,
    width: 24,
    borderColor: 'black',
    borderWidth: 1,
  },
  badgeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    paddingLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
  },
  padding: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 0,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#DFE0E6',
    alignSelf: 'stretch',
  },
  dropDownButton: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    height: 35,
    width: '100%',
  },
  dropDownText: {
    fontSize: 14,
    color: '#EB1685',
  },
});
