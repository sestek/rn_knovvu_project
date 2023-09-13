import {
  Badge,
  BottomSheet,
  Button,
  Card,
  Input,
  ListItem,
  Text,
  Icon,
} from '@rneui/base';
import {KnovvuMainLogo2} from '@src/assests';
import ColorPickerModal from '@src/components/colorPickerModal';
import {useAppDispatch, useAppSelector} from '@src/utils/redux/hooks';
import {
  asyncSetCustomizeConfiguration,
  asyncSetInitialState,
} from '@src/utils/redux/slice/webchatSlice';
import React, {useEffect, useState, useRef} from 'react';
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
  FlatList,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import base64 from 'react-native-base64';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface WebchatType {
  url: string;
  tenant: string;
  project: string;
  customActionData: any;
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

interface ListItem {
  id: string;
  key: string;
  value: string;
}

const Settings = () => {
  /* 
        PROJECT NAME SELECTED SIDE #######
    */
  const dispatch = useAppDispatch();
  const inputRef = useRef<Input>(null);
  const [headerColorState, setHeaderColorState] = useState<boolean>(false);
  const [bottomColorState, setBottomColorState] = useState<boolean>(false);
  const [incomingColorState, setIncomingColorState] = useState<boolean>(false);
  const [outgoingColorState, setOutgoingColorState] = useState<boolean>(false);
  const [messageColorState, setMessageColorState] = useState<boolean>(false);
  const [messageBoxColorState, setMessageBoxColorState] =
    useState<boolean>(false);
  const [base64State, setBase64State] = useState<string>('');
  const [listData, setListData] = useState<ListItem[]>([]);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [isProjectSelected, setIsProjectSelected] = useState<boolean>(false);
  const triggerProjectSelected = () => setIsProjectSelected(old => !old);
  const color_100 = useAppSelector(state => state.theme.color_100);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [demoProjectList, setDemoProjectList]: any = useState([
    // { key: "DEMO_1_TR", value: { url: "https://eu.va.knovvu.com/webchat/chathub", tenant: "Demo", project: "TR_BANKACILIK_DEMO_v1.0" } },
    // { key: "DEMO_2_EN", value: { url: "https://eu.va.knovvu.com/webchat/chathub", tenant: "Demo", project: "EN_BANKING_DEMO_v1.4" } },
    // { key: "DEMO_3_AR", value: { url: "https://eu.va.knovvu.com/webchat/chathub", tenant: "Demo", project: "AR_BANKING_DEMO_v1.0" } },
    // { key: "DEMO_4_TR", value: { url: "https://eu.va.knovvu.com/webchat/chathub", tenant: "Demo", project: "TR_ETICARET_DEMO_v1.0" } },
    // { key: "DEMO_5_EN", value: { url: "https://eu.va.knovvu.com/webchat/chathub", tenant: "Demo", project: "EN_PERSONAL_SHOPPER" } },
    // { key: "DEMO_6_TR", value: { url: "https://nd-test-webchat.sestek.com/chathub", tenant: "Tayfun", project: "GocIdaresi_TR" } },
    // { key: 'DEMO_7', value: { url: 'https://igavassistwebchat.igairport.aero:6443/chathub', tenant: 'Default', project: 'TR_BANKACILIK' } }
  ]);

  const webchat = useAppSelector(state => state.webchat);

  useEffect(() => {
    const newObj = Object.assign({}, webchat);
    setWebchatCustomize(newObj);
  }, [webchat]);

  useEffect(() => {
     const apiUrl = 'https://api-gateway.sestek.com/wtIdentity'
    const requestData = {
      client_id: 'Wagtail_Test',
      client_secret: '1q2w3E*',
      grant_type: 'client_credentials',
    };
    const encode2 = (str) =>
    encodeURIComponent(str)
        .replace(/\!/g, '%21')
        .replace(/\~/g, '%7E')
        .replace(/\*/g, '%2A')
        .replace(/\'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
    const toFormUrlEncoded = data =>
      Object.entries(data)
        .map(
          ([key, value]) =>
            `${encode2(key)}=${encode2(value)}`,
        )
        .join('&');

    const formData = toFormUrlEncoded(requestData);
    console.log(formData)

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('API yanıtı:', data);
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      });

    
  }, []);

  useEffect(() => {
    const socket = new WebSocket('wss://nesibe-yilmaz-tokyo.wagtail.test.core.devops.sestek.com.tr/project-runner/chatgpt');

    socket.onopen = () => {
      console.log('WebSocket bağlantısı başarıyla açıldı.');
    };

    socket.onmessage = (e) => {
      console.log('WebSocket mesajı alındı:', e.data);
    };

    socket.onclose = (e) => {
      console.log('WebSocket bağlantısı kapatıldı:', e.reason);
    };

    socket.onerror = (e) => {
      console.error('WebSocket hatası:', e.message);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    axios
      .get('https://api-gateway.sestek.com/get-demos')
      .then(response => {
        setDemoProjectList(response.data);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }, []);

  useEffect(() => {
    var newObj = listData.map(item => ({[item.key]: item.value}));
    const mergedObj = Object.assign({}, ...newObj);
    onChangeCustomize('customActionData', JSON.stringify(mergedObj));
  }, [listData]);

  const addDemoProjectList = (demoProject: any) => {
    if (
      demoProject &&
      !demoProjectList.find((x: any) => x.key === demoProject.key)
    ) {
      setDemoProjectList((prev: any) => [...prev, demoProject]);
      axios
        .post(
          `https://api-gateway.sestek.com/add-demo?key=${demoProject.key}&url=${demoProject.value.url}&tenant=${demoProject.value.tenant}&project=${demoProject.value.project}`,
        )
        .then(response => {
          if (response.data == true)
            showMessage({
              backgroundColor: '#7f81ae',
              description: 'Your changes have been made.',
              message: 'Success',
            });
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
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
        {text: 'OK', onPress: () => dispatch(asyncSetInitialState())},
      ],
    );
  };

  const freeTextSave = async () => {
    try {
      const freeTextStr = base64.decode(base64State);
      const freeText = freeTextStr.split('|');
      if (Array.isArray(freeText) && freeText.length === 3) {
        await saveUrlTenantProject(freeText[0], freeText[1], freeText[2]);
        addDemoProjectList({
          key: freeText[2],
          value: {url: freeText[0], tenant: freeText[1], project: freeText[2]},
        });
        setBase64State('');
      } else {
        throw new Error('The data you entered is not correct.');
      }
    } catch (err: any) {
      if (err?.message) {
        showMessage({
          backgroundColor: '#7f81ae',
          description: err.message,
          message: 'Error',
        });
      }
    }
  };

  const saveUrlTenantProject = async (
    url: string,
    tenant: string,
    project: string,
  ) => {
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
  };

  //////////////////cutomActionData Add
  const handleAddItem = () => {
    if (keyInput && valueInput) {
      const newItem: ListItem = {
        id: Date.now().toString(),
        key: keyInput,
        value: valueInput,
      };
      setListData([...listData, newItem]);
      setKeyInput('');
      setValueInput('');
      inputRef.current?.focus();
    }
  };
  const handleDeleteItem = (item: ListItem) => {
    const updatedData = listData.filter(dataItem => dataItem.id !== item.id);
    setListData(updatedData);
    inputRef.current?.focus();
  };
  const renderItem = ({item}: {item: ListItem}) => (
    <View
      style={{
        backgroundColor: 'white',
        bottom: 0,
        padding: 8,
        flexDirection: 'row',
      }}>
      <View style={{flexDirection: 'row', width: '94%'}}>
        <View style={{flex: 3, paddingHorizontal: 2}}>
          <Input disabled value={item.key} />
        </View>
        <View style={{flex: 3, paddingHorizontal: 2}}>
          <Input disabled value={item.value} />
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDeleteItem(item)}>
        <Ionicons name="remove-outline" size={26} color="#EFAF41" />
      </TouchableOpacity>
    </View>
  );
  //////////////////cutomActionData Add

  return (
    <View style={{flex: 1, marginTop: 8}}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'android' ? 120 : 50}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{marginBottom: 60}}>
          <Image
            source={KnovvuMainLogo2}
            style={{width: Dimensions.get('window').width, height: 100}}
            resizeMode="cover"
          />
          <Card wrapperStyle={styles.padding}>
            <Card.Title>DEFAULT CONFIGURATION</Card.Title>
            <Card.Divider />
            <View style={styles.padding}>
              <Button
                title={
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: 'white',
                      }}>
                      {demoProjectList.find(
                        (x: {value: {project: string}}) =>
                          x?.value?.project === webchatCustomize.project,
                      )?.key || webchatCustomize.project}
                    </Text>
                    <Text style={{fontStyle: 'italic', fontSize: 12}}>
                      Please click to switch between projects.
                    </Text>
                  </View>
                }
                onPress={triggerProjectSelected}
                buttonStyle={{backgroundColor: color_100}}
              />
              <BottomSheet
                isVisible={isProjectSelected}
                modalProps={{}}
                scrollViewProps={{scrollEnabled: false}}
                onBackdropPress={triggerProjectSelected}>
                {demoProjectList.map((demo: any, i: any) => (
                  <ListItem
                    key={i}
                    onPress={async () => {
                      await saveUrlTenantProject(
                        demo.value.url,
                        demo.value.tenant,
                        demo.value.project,
                      );
                      triggerProjectSelected();
                    }}>
                    <ListItem.Content style={{alignItems: 'center'}}>
                      <ListItem.Title
                        style={{
                          marginBottom:
                            demoProjectList.length - 1 === i ? 20 : 0,
                        }}>
                        {demo.key}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </BottomSheet>
            </View>
          </Card>
          <Card>
            <Card.Title>CUSTOM CONFIGURATION</Card.Title>

            <View style={styles.padding}>
              {/* <Text style={styles.text}>Customer ID</Text> */}
              <Input
                placeholder="Customer ID"
                rightIcon={{type: 'font-awesome', name: 'link'}}
                value={webchatCustomize.customActionData}
                disabled
                onChangeText={value =>
                  onChangeCustomize('customActionData', value)
                }
              />
            </View>
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title style={styles.text}>
                      Add Custom Action Data
                    </ListItem.Title>
                  </ListItem.Content>
                  {expanded ? (
                    <Ionicons
                      name="chevron-up-outline"
                      size={26}
                      color="black"
                    />
                  ) : (
                    <Ionicons
                      name="chevron-down-outline"
                      size={26}
                      color="black"
                    />
                  )}
                </>
              }
              noIcon
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
              }}>
              <View style={{flex: 1, padding: 5}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    bottom: 0,
                    padding: 8,
                    flexDirection: 'row',
                  }}>
                  <View style={{flexDirection: 'row', width: '94%'}}>
                    <View style={{flex: 2, paddingHorizontal: 2, width: '47%'}}>
                      <Input
                        placeholder="Key"
                        value={keyInput}
                        onChangeText={text => setKeyInput(text)}
                        autoCapitalize="none"
                        ref={inputRef}
                      />
                    </View>
                    <View style={{flex: 2, paddingHorizontal: 2, width: '47%'}}>
                      <Input
                        placeholder="Value"
                        value={valueInput}
                        onChangeText={text => setValueInput(text)}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity onPress={handleAddItem}>
                      <Ionicons name="add-circle" size={26} color="#7f81ae" />
                    </TouchableOpacity>
                  </View>
                </View>
                <FlatList
                  data={listData}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
              </View>
            </ListItem.Accordion>
          </Card>
          <Card wrapperStyle={styles.padding}>
            <Card.Title>CUSTOMIZE STYLE</Card.Title>
            <Card.Divider />
            <View style={styles.padding}>
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
              <Pressable
                style={{display: 'flex'}}
                onPress={() => setHeaderColorState(true)}>
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
                rightIcon={{type: 'font-awesome', name: 'link'}}
                value={webchatCustomize.headerText}
                onChangeText={value => onChangeCustomize('headerText', value)}
              />
            </View>
            <View style={styles.padding}>
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
                rightIcon={{type: 'font-awesome', name: 'link'}}
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
              <Pressable onPress={() => setIncomingColorState(true)}>
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
                rightIcon={{type: 'font-awesome', name: 'link'}}
                value={webchatCustomize.incomingText}
                onChangeText={value => onChangeCustomize('incomingText', value)}
              />
            </View>
            <View style={styles.padding}>
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
                rightIcon={{type: 'font-awesome', name: 'link'}}
                value={webchatCustomize.outgoingText}
                onChangeText={value => onChangeCustomize('outgoingText', value)}
              />
            </View>
            <View style={styles.padding}>
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
          </Card>
          <Card wrapperStyle={styles.padding}>
            <Card.Title>FREE TEXT CONFIGURATION</Card.Title>
            <Card.Divider />

            <View style={styles.padding}>
              <Input
                placeholder="FREE TEXT"
                rightIcon={{type: 'font-awesome', name: 'link'}}
                value={base64State}
                onChangeText={value => setBase64State(value)}
              />

              <Button onPress={freeTextSave} color={color_100}>
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
        <View style={{flex: 2, paddingHorizontal: 2}}>
          <Button
            radius={10}
            onPress={saveChatState}
            color="#7f81ae"
            testID="save">
            Save
          </Button>
        </View>
        <View style={{flex: 2, marginLeft: 4}}>
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAdd: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Settings;
