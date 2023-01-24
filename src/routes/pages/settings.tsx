import {
  BottomSheet,
  Button,
  Card,
  Input,
  ListItem,
  Text,
} from '@rneui/base';
import { KnovvuMainLogo2 } from '@src/assests';
import ColorPickerModal from '@src/components/colorPickerModal';
import { useAppDispatch, useAppSelector } from '@src/utils/redux/hooks';
import {
  asyncSetCustomizeConfiguration,
  asyncSetInitialState,
} from '@src/utils/redux/slice/webchatSlice';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import base64 from 'react-native-base64';

interface WebchatType {
  url: string;
  tenant: string;
  project: string;
  headerColor: string;
  headerText: string;
  bottomColor: string;
  bottomText: string;
  incomingTextColor: string;
  incomingText: string;
  outgoingTextColor: string;
  outgoingText: string;
  messageColor: string;
  messageBoxColor: string;
}

const Settings = () => {
  /* 
        PROJECT NAME SELECTED SIDE #######
    */
  const [isProjectSelected, setIsProjectSelected] = useState<boolean>(false);
  const triggerProjectSelected = () => setIsProjectSelected(old => !old);
  const color_100 = useAppSelector(state => state.theme.color_100);

  const [demoProjectList, setDemoProjectList]: any = useState([
    { key: 'DEMO_1_TR', value: { url: 'https://eu.va.knovvu.com/webchat/chathub', tenant: 'Demo', project: 'TR_BANKACILIK_DEMO_v1.0' } },
    { key: 'DEMO_2_EN', value: { url: 'https://eu.va.knovvu.com/webchat/chathub', tenant: 'Demo', project: 'EN_BANKING_DEMO_v1.1' } },
    { key: 'DEMO_3_AR', value: { url: 'https://eu.va.knovvu.com/webchat/chathub', tenant: 'Demo', project: 'AR_BANKING_DEMO_v1.0' } },
    { key: 'DEMO_4_TR', value: { url: 'https://eu.va.knovvu.com/webchat/chathub', tenant: 'Demo', project: 'TR_ETICARET_DEMO_v1.0' } },
    { key: 'DEMO_5_EN', value: { url: 'https://eu.va.knovvu.com/webchat/chathub', tenant: 'Demo', project: 'EN_PERSONAL_SHOPPER' } },
    { key: 'DEMO_6_TR', value: { url: 'https://nd-test-webchat.sestek.com/chathub', tenant: 'Tayfun', project: 'GocIdaresi_TR' } },
    //{ key: 'DEMO_7', value: { url: 'https://unstable.web.cai.demo.sestek.com/webchat/chathub', tenant: 'Default', project: 'TR_BANKACILIK' } }
  ]);

  const addDemoProjectList = (demoProject: any) => {
    if (demoProject && !demoProjectList.find((x: any) => x.key === demoProject.key)) {
      setDemoProjectList((prev: any) => [...prev, demoProject]);
    }
  }

  const webchat = useAppSelector(state => state.webchat);
  useEffect(() => {
    const newObj = Object.assign({}, webchat);
    setWebchatCustomize(newObj);
  }, [webchat]);

  const [headerColorState, setHeaderColorState] = useState<boolean>(false);
  const [bottomColorState, setBottomColorState] = useState<boolean>(false);
  const [incomingColorState, setIncomingColorState] = useState<boolean>(false);
  const [outgoingColorState, setOutgoingColorState] = useState<boolean>(false);
  const [messageColorState, setMessageColorState] = useState<boolean>(false);
  const [messageBoxColorState, setMessageBoxColorState] =
    useState<boolean>(false);
  const [base64State, setBase64State] = useState<string>("");


  const dispatch = useAppDispatch();

  const onChangeInput = (key: string, value: string) => {
    const newObj = Object.assign({}, webchatCustomize);
    (newObj as any)[key] = value;
    setWebchatCustomize(newObj);
  };

  const [webchatCustomize, setWebchatCustomize] = useState<WebchatType>(
    Object.assign({}, webchat),
  );

  const onChangeCustomize = (key: string, value: string) => {
    const newObj = Object.assign({}, webchatCustomize);
    (newObj as any)[key] = value;
    setWebchatCustomize(newObj);
  };

  const saveChatState = async () => {
    await dispatch(asyncSetCustomizeConfiguration(webchatCustomize));
    showMessage({
      backgroundColor: '#7f81ae',
      description: 'Your changes have been made.',
      message: 'Success',
    });
  };

  const resetChatState = () => {
    Alert.alert(
      'Warning',
      'If you do a reset, the settings will return to the settings when the application was first installed.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => dispatch(asyncSetInitialState()) },
      ],
    );
  };

  const selectedUrl = (getIndex: boolean, newUrl?: number) => {
    const urlData = [
      'https://stable.web.cai.demo.sestek.com/webchat/chathub',
      'https://nd-test-webchat2.sestek.com/chathub',
      'https://nd-test-webchat.sestek.com/chathub',
    ];
    if (getIndex) {
      return urlData.findIndex(url => url === webchatCustomize.url);
    } else {
      onChangeInput('url', urlData[newUrl || 0]);
    }
  };

  const freeTextSave = async () => {
    try {
      const freeTextStr = base64.decode(base64State);
      const freeText = freeTextStr.split('|');
      if (Array.isArray(freeText) && freeText.length === 3) {
        await saveUrlTenantProject(freeText[0], freeText[1], freeText[2]);
        addDemoProjectList({ key: freeText[2], value: { url: freeText[0], tenant: freeText[1], project: freeText[2] } });
        setBase64State("");
      }
      else {
        throw new Error('The data you entered is not correct.');
      }
    }
    catch (err: any) {
      if (err?.message) {
        showMessage({
          backgroundColor: '#7f81ae',
          description: err.message,
          message: 'Error',
        });
      }

    }
  };

  const saveUrlTenantProject = async (url: string, tenant: string, project: string) => {
    const degisken = Object.assign({}, webchat);
    degisken.url = url;
    degisken.tenant = tenant;
    degisken.project = project;
    await dispatch(asyncSetCustomizeConfiguration(degisken));
    showMessage({
      backgroundColor: '#7f81ae',
      description: 'Your changes have been made.',
      message: 'Success',
    });
  }

  return (
    <View style={{ flex: 1, marginTop: 8 }}>
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'android' ? 120 : 50} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{ marginBottom: 60 }}>
          <Image
            source={KnovvuMainLogo2}
            style={{ width: Dimensions.get('window').width, height: 100 }}
            resizeMode="cover"
          />
          <Card style={styles.padding}>
            <Card.Title>DEFAULT CONFIGURATION</Card.Title>
            <Card.Divider />
            {/*<View style={styles.padding}>
                        <Text style={styles.text}>URL</Text>
                        {/*<Input
                            placeholder="URL"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.url}
                            onChangeText={value => onChangeInput('url', value)}
                        />
                        <ButtonGroup
                            buttons={['Knovvu', 'Knovvu Unstable', 'Nda', 'Nda Test']}
                            selectedIndex={selectedUrl(true)}
                            onPress={(value) => {
                                selectedUrl(false, value);
                            }}
                        />

                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.text}>Tenant</Text>
                        <Input
                            placeholder="Tenant"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.tenant}
                            onChangeText={value => onChangeInput('tenant', value)}
                            testID="tenant"
                        />
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.text}>Project</Text>
                        <Input
                            placeholder="Project"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.project}
                            onChangeText={value => onChangeInput('project', value)}
                            testID="project"
                        />
                    </View>*/}
            <View style={styles.padding}>
              <Button
                title={
                  <View style={{ flexDirection: 'column' }}>
                    <Text
                      style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
                      {demoProjectList.find(x => x?.value?.project === webchatCustomize.project)?.key || webchatCustomize.project}
                    </Text>
                    <Text style={{ fontStyle: 'italic', fontSize: 12 }}>
                      Please click to switch between projects.
                    </Text>
                  </View>
                }
                onPress={triggerProjectSelected}
                buttonStyle={{ backgroundColor: color_100 }}
              />
              <BottomSheet
                isVisible={isProjectSelected}
                modalProps={{}}
                scrollViewProps={{ scrollEnabled: false }}
                onBackdropPress={triggerProjectSelected}>
                {demoProjectList.map((demo: any, i: any) => (
                  <ListItem
                    key={i}
                    onPress={async () => {
                      await saveUrlTenantProject(demo.value.url, demo.value.tenant, demo.value.project);
                      triggerProjectSelected();
                    }}>
                    <ListItem.Content style={{ alignItems: 'center' }}>
                      <ListItem.Title
                        style={{
                          marginBottom: demoProjectList.length - 1 === i ? 20 : 0,
                        }}>
                        {demo.key}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </BottomSheet>
            </View>
          </Card>
          <Card style={styles.padding}>
            <Card.Title>CUSTOMIZE CONFIGURATION</Card.Title>
            <Card.Divider />
            <View style={styles.padding} >
              <Text style={styles.text}>Header Color</Text>
              <ColorPickerModal
                color={webchatCustomize.headerColor}
                headerText="Header Color"
                isVisible={headerColorState}
                setIsVisible={setHeaderColorState}
                saveColor={(color: string) =>
                  onChangeCustomize('headerColor', color)
                }
              />
              <Pressable onPress={() => setHeaderColorState(true)}>
              <Input
                disabled
                placeholder="Header Color"
                leftIcon={{
                  type: 'font-awesome',
                  name: 'circle',
                  color: webchatCustomize.headerColor,
                }}
                value={webchatCustomize.headerColor}
              />
              </Pressable>
            </View>
            <View style={styles.padding}>
              <Text style={styles.text}>Header Text</Text>
              <Input
                placeholder="Header Text"
                rightIcon={{ type: 'font-awesome', name: 'link' }}
                value={webchatCustomize.headerText}
                onChangeText={value => onChangeCustomize('headerText', value)}
              />
            </View>
            <View style={styles.padding} >
              <Text style={styles.text}>Bottom Color</Text>
              <ColorPickerModal
                color={webchatCustomize.bottomColor}
                headerText="Bottom Color"
                isVisible={bottomColorState}
                setIsVisible={setBottomColorState}
                saveColor={(color: string) =>
                  onChangeCustomize('bottomColor', color)
                }
              />
              <Pressable onPress={() => setBottomColorState(true)}>
              <Input
                disabled
                placeholder="Bottom Color"
                leftIcon={{
                  type: 'font-awesome',
                  name: 'circle',
                  color: webchatCustomize.bottomColor,
                }}
                value={webchatCustomize.bottomColor}
              />
              </Pressable>
            </View>
            <View style={styles.padding}>
              <Text style={styles.text}>Bottom Text</Text>
              <Input
                placeholder="Bottom Text"
                rightIcon={{ type: 'font-awesome', name: 'link' }}
                value={webchatCustomize.bottomText}
                onChangeText={value => onChangeCustomize('bottomText', value)}
              />
            </View>
            <View style={styles.padding}>
              <Text style={styles.text}>Incoming Text Color</Text>
              <ColorPickerModal
                color={webchatCustomize.incomingTextColor}
                headerText="Incoming Text Color"
                isVisible={incomingColorState}
                setIsVisible={setIncomingColorState}
                saveColor={(color: string) =>
                  onChangeCustomize('incomingTextColor', color)
                }
              />
              <Pressable  onPress={() => setIncomingColorState(true)}>
              <Input
                disabled
                placeholder="Incoming Text Color"
                leftIcon={{
                  type: 'font-awesome',
                  name: 'circle',
                  color: webchatCustomize.incomingTextColor,
                }}
                value={webchatCustomize.incomingTextColor}
                testID="incomingtextColor"
              />
              </Pressable>
            </View>
            <View style={styles.padding}>
              <Text style={styles.text}>Incoming Text</Text>
              <Input
                placeholder="Incoming Text"
                rightIcon={{ type: 'font-awesome', name: 'link' }}
                value={webchatCustomize.incomingText}
                onChangeText={value => onChangeCustomize('incomingText', value)}
              />
            </View>
            <View style={styles.padding} >
              <Text style={styles.text}>Outgoing Text Color</Text>
              <ColorPickerModal
                color={webchatCustomize.outgoingTextColor}
                headerText="Outgoing Text Color"
                isVisible={outgoingColorState}
                setIsVisible={setOutgoingColorState}
                saveColor={(color: string) =>
                  onChangeCustomize('outgoingTextColor', color)
                }
              />
              <Pressable onPress={() => setOutgoingColorState(true)}>
              <Input
                disabled
                placeholder="Outgoing Text Color"
                leftIcon={{
                  type: 'font-awesome',
                  name: 'circle',
                  color: webchatCustomize.outgoingTextColor,
                }}
                value={webchatCustomize.outgoingTextColor}
              />
              </Pressable>
            </View>
            <View style={styles.padding}>
              <Text style={styles.text}>Outgoing Text</Text>
              <Input
                placeholder="Outgoing Text"
                rightIcon={{ type: 'font-awesome', name: 'link' }}
                value={webchatCustomize.outgoingText}
                onChangeText={value => onChangeCustomize('outgoingText', value)}
              />
            </View>
            <View style={styles.padding} >
              <Text style={styles.text}>Message Color</Text>
              <ColorPickerModal
                color={webchatCustomize.messageColor}
                headerText="Message Color"
                isVisible={messageColorState}
                setIsVisible={setMessageColorState}
                saveColor={(color: string) =>
                  onChangeCustomize('messageColor', color)
                }
              />
              <Pressable onPress={() => setMessageColorState(true)}>
              <Input
                placeholder="Message Color"
                leftIcon={{
                  type: 'font-awesome',
                  name: 'circle',
                  color: webchatCustomize.messageColor,
                }}
                value={webchatCustomize.messageColor}
                disabled
              />
              </Pressable>
            </View>
            <View style={styles.padding} >
              <Text style={styles.text}>Message Box Color</Text>
              <ColorPickerModal
                color={webchatCustomize.messageBoxColor}
                headerText="Message Box Color"
                isVisible={messageBoxColorState}
                setIsVisible={setMessageBoxColorState}
                saveColor={(color: string) =>
                  onChangeCustomize('messageBoxColor', color)
                }
              />
              <Pressable onPress={() => setMessageBoxColorState(true)}>
              <Input
                placeholder="Message Box Color"
                leftIcon={{
                  type: 'font-awesome',
                  name: 'circle',
                  color: webchatCustomize.messageBoxColor,
                }}
                value={webchatCustomize.messageBoxColor}
                disabled
              />
              </Pressable>
            </View>
          </Card>
          <Card style={styles.padding}>
            <Card.Title>FREE TEXT CONFIGURATION</Card.Title>
            <Card.Divider />

            <View style={styles.padding}>
              <Input
                placeholder="FREE TEXT"
                rightIcon={{ type: 'font-awesome', name: 'link' }}
                value={base64State}
                onChangeText={value => setBase64State(value)}
              />
              <Button
                onPress={freeTextSave}
                color={color_100}
              >
                Free Text Save
              </Button>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          padding: 8,
          flexDirection: 'row',
        }}>
        <View style={{ flex: 2, paddingHorizontal: 2 }}>
          <Button
            radius={10}
            onPress={saveChatState}
            color="#7f81ae"
            testID="save">
            Save
          </Button>
        </View>
        <View style={{ flex: 2, marginLeft: 4 }}>
          <Button
            radius={10}
            onPress={resetChatState}
            type="solid"
            color={'warning'}
            testID="reset">
            Reset
          </Button>
        </View>
      </View>
    </View>
  );
};

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
});

export default Settings;
