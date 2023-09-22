// < ----------------  import ------------- >

import {Text} from '@rneui/base';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import {Close, LottieRecord, Mic, StopMic} from '@src/assests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import MessageBoxBody from '@src/components/chatgpt/MessageBoxBody';
import useModalCloseStore from '../../zustandStore/store';
import Recorder from '@src/service/Recorder';
import CustomWebSocket from '@src/service/CustomWebsocket';
import Uint8ArrayFromBase64 from '@src/utils/functions/unit8ArrayFunc';
import PermissionCheck from '@src/utils/functions/permission';

// < ------------------------  finish ---------------------- >

// < ----------------  create socket and audio ------------- >
const recorder = new Recorder();
const socket = new CustomWebSocket();
// < ------------------------  finish ---------------------- >

const ChatGpt = ({navigation}) => {
  // < ----------------  MessageList and panc Message ------------- >
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
  const [pancMessage, setPancMessage] = useState('');
  // < ------------------------  finish ---------------------- >

  // < ------------------------  Socket Operation ---------------------- >

  socket.websocket.onmessage = e => {
    console.log('Mesaj:', e.data);
  };
  socket.websocket.onclose = e => {
    console.log('socket bağlantısı kapatıldı:', e.reason);
  };
  socket.websocket.onerror = e => {
    console.error('socket hatası:', e.message);
  };
  // < ------------------------  finish ---------------------- >

  // < ------------------------  Token  ---------------------- >

  const requestToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('tokenımız :', token);
    return token;
  };

  // < ------------------------  finish ---------------------- >

  // < ------------------------  Modal Control  ---------------------- >

  const {isModalOpen, setIsModalOpen} = useModalCloseStore();
  const closeModalButton = () => {
    setRecordStatus(false);
    setIsModalOpen(false);
    navigation.navigate('Home');
  };

  // < ------------------------  finish ---------------------- >

  // < ------------------------ State Base  ---------------------- >

  const [recordStatus, setRecordStatus] = useState(false);

  // < ------------------------  finish ---------------------- >

  // < ------------------------  Stop Record Button ---------------------- >

  const handleSend = async () => {
    try {
      await recorder.onStopRecord();
      // o an ki gönderilecek
      setRecordStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  // < ------------------------  finish ---------------------- >

  // < ------------------------  Start Record Button ---------------------- >

  const handleRecord = async () => {
    console.log('Kayıt Başladı');
    PermissionCheck();
    setRecordStatus(true);
    await recorder.onStartRecord();
    try {
      setTimeout(() => {
        sendAudioToSocket();
      }, 4000);
      // setInterval(() => {

      // }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  // < ------------------------  finish ---------------------- >

  // < ------------------------  Socket send Audio ---------------------- >

  const sendAudioToSocket = async () => {
    try {
      const soundPath = await recorder.onStopRecord();

      if (soundPath) {
        console.log('sound path:', soundPath);
        const audioToBase64 = await recorder.recordToBase64(soundPath);

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
        const convertedAudio = await Uint8ArrayFromBase64(myBase64);
        console.log('Gönderiliyor...');
        socket.websocket.send(convertedAudio);
        //await recorder.onStartRecord();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // < ------------------------  finish ---------------------- >

  return (
    <Modal animationType="slide" visible={isModalOpen}>
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

// < ------------------------  Style---------------------- >

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

// < ------------------------  finish ---------------------- >

export default ChatGpt;
