import {Button, Card, Text} from '@rneui/base';
import {useAppSelector} from '@src/utils/redux/hooks';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Modal,
  SafeAreaView,
} from 'react-native';
import {Close, LottieRecord, Mic, StopMic} from '@src/assests';
// import Recorder from '@src/service/Recorder';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-fetch-blob';
import createUUID from '@src/utils/functions/createUUID';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import MessageBoxBody from '@src/components/chatgpt/MessageBoxBody';
import useModalCloseStore from '../../zustandStore/store';

const ChatGpt = ({navigation}) => {
  const recorder = new AudioRecorderPlayer();
  const [recordStatus, setRecordStatus] = useState(false);
  const requestToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('tokenımız :', token);
    return token;
  };
  // const socket = new WebSocket(
  //   'wss://nesibe-yilmaz-tokyo.wagtail.test.core.devops.sestek.com.tr/project-runner/chatgpt',
  //   {
  //     headers: {
  //       ['Authorization']: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwNDhENDI5NjI0QzAzRDQ3NzIyNEQyOEQ5REFDMEY3IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2OTQxNzE2MTEsImV4cCI6MTcyNTcwNzYxMSwiaXNzIjoiL2NvcmUtYmFja2VuZC1hdXRoIiwiYXVkIjoiV2FndGFpbCIsImNsaWVudF9pZCI6IldhZ3RhaWxfVGVzdCIsImlhdCI6MTY5NDE3MTYxMSwic2NvcGUiOlsiV2FndGFpbCJdfQ.rxQj4xbm7r9tFsFD-RlVxyOZKRViERryuo9biGwsLRLCdTZhoOEJuqhoS-dHoWxGsm1Tw5rwV0p9mLnDBewxm7vWsolK9N-F2y1xSxpyDG6azLuR-rGD2wlfkRTvR-T5exI3OQ4G8AQM86k3Wrw5pk2XLKc8zh-1ju1TFtblTLTX68sDChKrSZWbHvxcnilrR0Y_gINtRlSjfX1dSibMcQ-hIctQqIVHokwbTj1EfYsdsVBMn61XCXnNPN_QyNvW2o01yxILeCKgQYyetTXImUlnk-KsC_e33vU2eAXa5xjPoZ_5xjtnLE1_m0yFmZPN_2-NOdI8qXif1XTan5SHGA`,
  //     },
  //   },
  // );

  // console.log(socket);

  const permission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  const handleRecord = async () => {
    setRecordStatus(true);
    // permission();
    // try {
    //   let dirsFOLDER = RNFetchBlob.fs.dirs;
    //   let folderPath = dirsFOLDER.CacheDir + '/sestek_bot';
    //   RNFetchBlob.fs
    //     .mkdir(folderPath)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));

    //   const dirs = RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot';
    //   const path = Platform.select({
    //     ios: 'sestek_bot/' + createUUID() + '.m4a',
    //     android: `${dirs}/${createUUID()}.wav`,
    //   });

    //   await recorder.startRecorder(path);
    //   recorder.addRecordBackListener((e: any) => {
    //     console.log('record : ', e.currentPosition);
    //     console.log('ms : ', recorder.mmssss(Math.floor(e.currentPosition)));
    //     //return;
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // setInterval(() => {

    // }, 500);
  };

  const handleSend = async () => {
    setRecordStatus(false);

    //const result = await recorder.stopRecorder();
    // try {
    //   recorder.removeRecordBackListener();
    //   const dirFile = result.split('/');
    //   const data =
    //     RNFetchBlob.fs.dirs.CacheDir + '/' + dirFile[dirFile.length - 1];
    //   const SendData = {
    //     url: result,
    //     data: await RNFetchBlob.fs.readFile(data, 'base64'),
    //   };
    //   socket.send(SendData.data);
    //   console.log(SendData.data);
    // } catch (error) {
    //   console.log(error);
    // }
    //return {url: result, data: await RNFetchBlob.fs.readFile(data, 'base64')};
  };

  // useEffect(() => {
  //   try {
  //     socket.onopen = (event: any) => {
  //       //socket.send(JSON.stringify(apiCall));
  //       console.log('Web Socket open', event);
  //       socket.send(
  //         JSON.stringify({
  //           'message-name': 'start',
  //           audio: {
  //             'sample-rate': '8000',
  //             'channel-count': '1',
  //           },
  //           ca: {
  //             user_properties: {},
  //           },
  //           settings: {
  //             channel_tags: null,
  //           },
  //           tenant_id: '3a0cc777-85df-d0ec-0ef2-d0117048aab5',
  //         }),
  //       );
  //     };
  //     socket.onmessage = e => {
  //       console.log('WebSocket mesajı alındı:', e.data);
  //     };
  //     socket.onclose = e => {
  //       console.log('WebSocket bağlantısı kapatıldı:', e.reason);
  //     };
  //     socket.onerror = e => {
  //       console.error('WebSocket hatası:', e.message);
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const [fakeMessages, setFakeMessages] = useState([
    {
      key: 1,
      value: `Tayfunnn ipsum dolor sit amet consectetur adipisicing elit. Quos,sint quo. Facere, alias possimus.`,
      position: 'left',
      type: 'message',
    },
    {
      key: 2,
      value: `Tayfunnn ipsum dolor sit amet consectetur adipisicing elit. Quos,sint quo. Facere, alias possimus.`,
      position: 'right',
      type: 'message',
    },
    {
      key: 3,
      value: `Tayfunnn ipsum dolor sit amet consectetur adipisicing elit. Quos,sint quo. Facere, alias possimus.`,
      position: 'left',
      type: 'message',
    },
    {
      key: 4,
      value: `Tayfunnn ipsum dolor sit amet consectetur adipisicing elit. Quos,sint quo. Facere, alias possimus.`,
      position: 'right',
      type: 'message',
    },
    {
      key: 5,
      value: `Tayfunnn ipsum dolor sit amet consectetur adipisicing elit. Quos,sint quo. Facere, alias possimus.`,
      position: 'right',
      type: 'message',
    },
    {
      key: 6,
      value: `Tayfunnn ipsum dolor sit amet consectetur adipisicing elit. Quos,sint quo. Facere, alias possimus.`,
      position: 'left',
      type: 'message',
    },
  ]);

  const {isModalOpen, setIsModalOpen} = useModalCloseStore();

  const closeModalButton = () => {
    setRecordStatus(false);
    setIsModalOpen(false);
    navigation.navigate('Home');
  };

  return (
    <Modal
      animationType="slide"
      //transparent={true}
      visible={isModalOpen}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      //   setModalVisible(!modalVisible);
      // }}
    >
      <SafeAreaView style={styles.SafeArea}>
        <View style={styles.upBar}>
          <Text style={styles.title}>VoiceGPT</Text>
          <TouchableOpacity onPress={closeModalButton}>
            <Image
              source={Close}
              resizeMode="stretch"
              style={{
                ...styles.Close,
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          <MessageBoxBody messages={fakeMessages} />
        </ScrollView>
      </SafeAreaView>

      {true && (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#BEBED5',
            height: Dimensions.get('screen').width * 0.6,
          }}>
          {recordStatus ? (
            // kayıt var
            <View
              style={{
                display: 'flex',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
              }}>
              <Lottie
                source={LottieRecord}
                speed={0.1}
                autoPlay
                loop
                style={{
                  // width: Dimensions.get('screen').width,
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 5,
                }}
              />
              <TouchableOpacity
                style={{zIndex: 10, position: 'absolute', bottom: 20}}
                onPress={() => handleSend()}>
                <Image
                  source={StopMic}
                  resizeMode="stretch"
                  style={{
                    ...styles.Mic,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            // Bu kısım kayıt olmayan
            <View style={styles.recorder}>
              <TouchableOpacity onPress={() => handleRecord()}>
                <Image source={Mic} resizeMode="stretch" style={styles.Mic} />
              </TouchableOpacity>
            </View>
          )}
          <View style={{backgroundColor: 'blue', marginTop: 10}}>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum,
              animi aperiam? Tenetur explicabo, nulla maxime autem error a rem
              nemo.
            </Text>
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  SafeArea: {
    flex: 1,
    backgroundColor: '#E9EDF0',
  },
  scroll: {
    flex: 1,
    flexDirection: 'column',
  },
  recorder: {
    alignItems: 'center',
    // padding: 8,
    paddingTop: 10,
    justifyContent: 'center',
  },
  Mic: {
    width: Dimensions.get('screen').width * 0.2,
    height: Dimensions.get('screen').width * 0.2,
  },
  Close: {
    width: Dimensions.get('screen').width * 0.05,
    height: Dimensions.get('screen').width * 0.05,
  },
  title: {
    color: '#373F48',
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 39,
  },
  upBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
});

export default ChatGpt;
