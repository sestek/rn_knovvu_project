import {Button, Card, Input, ListItem, Text} from '@rneui/base';
import {useAppDispatch, useAppSelector} from '@src/utils/redux/hooks';
import {
  asyncSetCustomizeConfiguration,
  asyncSetInitialState,
} from '@src/utils/redux/slice/webchatSlice';
import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import base64 from 'react-native-base64';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpBarCom from '@src/components/UpBarCom';
import DropDownCmp from '@src/components/DropDownCmp';
import CustomizeStyleCard from '@src/components/CustomizeStyleCardCmp';
import CollapseView from '@src/components/CollapseView';

interface WebchatType {
  url: string;
  tenant: string;
  project: string;
  customActionData: any;
  enableNdUi: boolean;
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

const Settings = ({navigation}) => {
  /* 
        PROJECT NAME SELECTED SIDE #######
    */
  const dispatch = useAppDispatch();
  const inputRef = useRef<Input>(null);
  const [base64State, setBase64State] = useState<string>('');
  const [listData, setListData] = useState<ListItem[]>([]);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const color_100 = useAppSelector(state => state.theme.color_100);
  const [demoProjectList, setDemoProjectList]: any = useState([]);

  const webchat = useAppSelector(state => state.webchat);

  useEffect(() => {
    const newObj = Object.assign({}, webchat);
    setWebchatCustomize(newObj);
  }, [webchat]);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      //console.log('b:', token);
    };
    getToken();
  }, []);

  useEffect(() => {
    axios
      .get('https://api-gateway.sestek.com/get-demos')
      .then(response => {
        setDemoProjectList(response.data);
        // console.log(response);
      })
      .catch(error => {
        // console.log('Error: ', error);
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
          `https://api-gateway.sestek.com/add-demo?key=${demoProject.key}&url=${demoProject.value.url}&tenant=${demoProject.value.tenant}&project=${demoProject.value.project}&isMicEnabled=${demoProject.value.isMicEnabled}&personaId=${demoProject.value.personaId}'`,
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
        {
          text: 'OK',
          onPress: () => (
            setValueInput(''), setListData([]), dispatch(asyncSetInitialState())
          ),
        },
      ],
    );
  };

  const freeTextSave = async () => {
    try {
      const freeTextStr = base64.decode(base64State);
      const freeText = freeTextStr.split('|');
      if (Array.isArray(freeText) && freeText.length === 5) {
        await saveUrlTenantProject(
          freeText[0],
          freeText[1],
          freeText[2],
          freeText[3],
          freeText[4],
        );
        addDemoProjectList({
          key: freeText[2],
          value: {
            url: freeText[0],
            tenant: freeText[1],
            project: freeText[2],
            isMicEnabled: freeText[3],
            personaId: freeText[4],
          },
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
    isMicEnabled: string,
    personaId: string,
    enableNdUi: boolean,
  ) => {
    const data = Object.assign({}, webchat);
    data.url = url;
    data.tenant = tenant;
    data.project = project;
    data.isMicEnabled = isMicEnabled;
    data.personaId = personaId;
    data.enableNdUi = enableNdUi;
    await dispatch(asyncSetCustomizeConfiguration(data));
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
  const renderItem = ({item, idx}: {item: ListItem; idx: number}) => (
    <View
      style={{
        backgroundColor: 'white',
        bottom: 0,
        padding: 8,
        flexDirection: 'row',
      }}
      key={idx}>
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

  ////////////////////////////////////////////////////////////////////////
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const openDropdown = () => {
    setDropdownVisible(true);
  };
  const closeDropdown = () => {
    setDropdownVisible(false);
  };
  const handleDone = async (item: string | null) => {
    var enableND = item?.value?.url.includes('//nd') ? true : false;
    await saveUrlTenantProject(
      item.value.url,
      item.value.tenant,
      item.value.project,
      item.value.isMicEnabled,
      item.value.personaId,
      enableND,
    );
  };

  ///////////////////////////////////////////////////////////////////////
  const [isModalVisible, setIsModalVisible] = useState(false);

  // ... existing code

  return (
    <UpBarCom
      navigation={navigation}
      title={'Projects and Settings'}
      close={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Card wrapperStyle={styles.padding}>
            <Card.Title style={styles.cardTitle}>PROJECTS</Card.Title>
            <Card.Divider />

            <View style={styles.padding}>
              <Text
                style={{fontStyle: 'italic', fontSize: 12, marginBottom: 10}}>
                Please click to switch between projects.
              </Text>
              <DropDownCmp
                isVisible={dropdownVisible}
                onClose={closeDropdown}
                items={demoProjectList}
                onDone={handleDone}
              />
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
                  </View>
                }
                onPress={openDropdown}
                buttonStyle={{
                  backgroundColor: '#EB1685',
                  borderRadius: 8,
                  height: 47,
                }}></Button>
            </View>
          </Card>
          <Card>
            <Card.Title style={styles.cardTitle}>
              CUSTOM CONFIGURATION
            </Card.Title>
            <Card.Divider />

            <View style={styles.padding}>
              <Input
                placeholder="Customer ID"
                value={webchatCustomize.customActionData}
                disabled
                onChangeText={value =>
                  onChangeCustomize('customActionData', value)
                }
                style={{color: '#EC008C'}}
              />
            </View>
            <CollapseView header="CUSTOM ACTION DATA">
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
                {/* <FlatList
                  data={listData}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                /> */}
                {listData?.map((item, idx) => {
                  return renderItem({item, idx});
                })}
              </View>
            </CollapseView>
          </Card>
          <Card wrapperStyle={styles.padding}>
            <Card.Title style={styles.cardTitle}>CUSTOMIZE STYLE</Card.Title>

            <CustomizeStyleCard
              webchatCustomize={webchatCustomize}
              onChangeCustomize={onChangeCustomize}
            />
          </Card>
          <View style={{marginBottom: Platform.OS === 'android' ? 100 : 80}}>
            <Card wrapperStyle={styles.padding}>
              <Card.Title style={styles.cardTitle}>ADD NEW PROJECT</Card.Title>
              <Card.Divider />
              {/* burada beklediğimiz format url|tenant|project|isMicEnabled|personaId */}
              <View style={styles.padding}>
                <TextInput
                  value={base64State}
                  onChangeText={value => setBase64State(value)}
                  placeholder="FREE TEXT"
                  multiline={true}
                  numberOfLines={4}
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#D9D9D9',
                    padding: 10,
                    height: 70,
                    marginBottom: 15,
                  }}
                />

                <Button
                  onPress={freeTextSave}
                  color={color_100}
                  buttonStyle={{
                    backgroundColor: '#EB1685',
                    borderRadius: 8,
                  }}>
                  Free Text Save
                </Button>
              </View>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          padding: 8,
          flexDirection: 'row',
        }}>
        <View style={{flex: 2, marginLeft: 4}}>
          <Button
            radius={9}
            onPress={resetChatState}
            color={'white'}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#5F6295',
              borderRadius: 10,
              borderStyle: 'solid',
            }}
            title={
              <Text
                style={{color: '#5F6295', fontSize: 16, fontWeight: 'bold'}}>
                Reset
              </Text>
            }
            testID="reset"></Button>
        </View>
        <View style={{flex: 2, paddingHorizontal: 2}}>
          <Button
            radius={9}
            onPress={saveChatState}
            color="#5F6295"
            testID="save"
            title={
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Save
              </Text>
            }
            style={{
              borderColor: '#5F6295',
              borderWidth: 1,
              borderRadius: 10,
            }}></Button>
        </View>
      </View>
    </UpBarCom>
  );
};

const styles = StyleSheet.create({
  padding: {
    padding: 8,
  },

  cardTitle: {color: '#5F6295'},
});

export default Settings;
