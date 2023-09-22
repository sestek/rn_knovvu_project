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
import {decode, encode} from 'base-64';
// import {decode, encode} from 'base64-js';
import {Buffer} from 'buffer';

const recorder = new AudioRecorderPlayer();

const ChatGpt = ({navigation}) => {
  const [recordStatus, setRecordStatus] = useState(false);
  const [pancMessage, setPancMessage] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  );
  const requestToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('tokenımız :', token);
    return token;
  };
  const socket = new WebSocket(
    'wss://nesibe-yilmaz-tokyo.wagtail.test.core.devops.sestek.com.tr/project-runner/chatgpt',
  );
  socket.onopen = (event: any) => {
    console.log('Web Socket open', event);
    socket.send(
      JSON.stringify({
        'message-name': 'start',
        audio: {
          'sample-rate': '8000',
          'channel-count': '1',
        },
        ca: {
          user_properties: {},
        },
        settings: {
          channel_tags: null,
        },
        tenant_id: '3a0cc777-85df-d0ec-0ef2-d0117048aab5',
      }),
    );
  };
  socket.onmessage = e => {
    console.log('Mesaj:', e.data);
  };
  socket.onclose = e => {
    console.log('WebSocket bağlantısı kapatıldı:', e.reason);
  };
  socket.onerror = e => {
    console.error('WebSocket hatası:', e.message);
  };

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

  const Uint8ArrayFromBase64 = async (value: any) => {
    const binaryString = decode(value);
    //console.log('rif:', binaryString);
    const uint8Array = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    return uint8Array;
  };

  const handleSend = async () => {
    try {
      await recorder.stopRecorder();
      recorder.removeRecordBackListener();
      setRecordStatus(false);
      const soundPath = Platform.select({
        ios: RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot/sound.m4a',
        android: RNFetchBlob.fs.dirs.CacheDir + `/sound.mp3`,
      });

      if (soundPath) {
        console.log('sound path : ', soundPath);
        const audioToBase64 = await RNFetchBlob.fs.readFile(
          soundPath,
          'base64',
        );
        let myBase64 = '';
        fetch('https://api-gateway.sestek.com/base64-aac-to-wav', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: audioToBase64,
        })
          .then(response => response.text())
          .then(data => {
            myBase64 = data;
          })
          .catch(error => {
            console.error('API isteği sırasında hata oluştu:', error);
          });
        
        const convertedAudio = await Uint8ArrayFromBase64(myBase64);
        //console.log(convertedAudio.toString());
        console.log('gönderiliyor !');
        socket.send(
          JSON.stringify({
            'message-name': 'start',
            audio: {
              'sample-rate': '8000',
              'channel-count': '1',
            },
            ca: {
              user_properties: {},
            },
            settings: {
              channel_tags: null,
            },
            tenant_id: '3a0cc777-85df-d0ec-0ef2-d0117048aab5',
          }),
        );
        socket.send(convertedAudio);
      }

      // ----------------------
    } catch (error) {
      console.log(error);
    }
  };

 
 

  const [fakeMessages, setFakeMessages] = useState([
    {
      key: 1,
      value: `Hello
      I want to know bla
      bla bla?`,
      position: 'right',
      type: 'message',
    },
    {
      key: 2,
      value: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
      position: 'left',
      type: 'message',
    },
    {
      key: 3,
      value: `The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using it.`,
      position: 'right',
      type: 'message',
    },
    {
      key: 4,
      value: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
      position: 'left',
      type: 'message',
    },
    {
      key: 5,
      value: `The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using it.`,
      position: 'right',
      type: 'message',
    },
  ]);

  const {isModalOpen, setIsModalOpen} = useModalCloseStore();

  const closeModalButton = () => {
    setRecordStatus(false);
    setIsModalOpen(false);
    navigation.navigate('Home');
  };
  const sendAudioToSocket = async () => {
    // console.log("socket",socket)
    try {
      await recorder.stopRecorder();
      recorder.removeRecordBackListener();
      setRecordStatus(false);
  
      const soundPath = Platform.select({
        ios: RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot/sound.m4a',
        android: RNFetchBlob.fs.dirs.CacheDir + '/sound.mp3',
      });
  
      if (soundPath) {
        console.log('sound path:', soundPath);
        const audioToBase64 = await RNFetchBlob.fs.readFile(soundPath, 'base64');
  
        // Base64 sesi dönüştür
        let myBase64 = '';
        await fetch('https://api-gateway.sestek.com/base64-aac-to-wav', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: audioToBase64,
        })
          .then(response => response.text())
          .then(data => {
            myBase64 = data;
          })
          .catch(error => {
            console.error('API isteği sırasında hata oluştu:', error);
          });
  
        // Base64'ü Uint8Array'a dönüştür
        const convertedAudio = await Uint8ArrayFromBase64(myBase64);
        // console.log("myBase64",myBase64)
        console.log('Gönderiliyor...');
        socket.send(convertedAudio);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRecord = async () => {
    console.log('Kayıt Başladı');
    permission();
    setRecordStatus(true);
  
    try {
      let dirsFOLDER = RNFetchBlob.fs.dirs;
      let folderPath = dirsFOLDER.CacheDir + '/sestek_bot';
      RNFetchBlob.fs
        .mkdir(folderPath)
        .then(res => console.log(res))
        .catch(err => console.log(err));
  
      const dirs = RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot';
      const path = Platform.select({
        ios: 'sestek_bot/' + 'sound' + '.m4a',
        android: `${dirs}/sound.mp3`,
      });
  
      console.log(dirs);
      console.log(path);
      await recorder.startRecorder(path);
  
      recorder.addRecordBackListener((e: any) => {
        console.log('record : ', e.currentPosition);
        console.log('ms : ', recorder.mmssss(Math.floor(e.currentPosition)));
      });
  
      // Ses kaydı bittiğinde otomatik olarak sokete gönder
      setTimeout(() => {
        sendAudioToSocket();
      }, 5000); // Örneğin 5 saniye sonra gönderilebilir, bu süreyi ayarlayabilirsiniz.
    } catch (error) {
      console.log(error);
    }
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

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#BEBED5',
          height: pancMessage
            ? Dimensions.get('screen').width * 0.6
            : Dimensions.get('screen').width * 0.4,
        }}>
        {recordStatus ? (
          // kayıt var
          <View
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
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
              style={{zIndex: 10, position: 'absolute'}}
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
        {pancMessage && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignContent: 'center',
              padding: 10,
            }}>
            <Text style={styles.pancMessage}>{pancMessage}</Text>
          </View>
        )}
      </View>
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
    flex: 1,
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
  pancMessage: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: '#181C2A',
  },
});

export default ChatGpt;
