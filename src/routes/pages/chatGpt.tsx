// < ----------------  import ------------- >

import {Text} from '@rneui/base';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {
  Close,
  LottieRecord,
  Mic,
  StopMic,
  BigRecord,
  BackgroundChatgpt,
} from '@src/assests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import MessageBoxBody from '@src/components/chatgpt/MessageBoxBody';
import useModalCloseStore from '../../zustandStore/store';
import Recorder from '@src/service/Recorder';
import CustomWebSocket from '@src/service/CustomWebsocket';
import Uint8ArrayFromBase64 from '@src/utils/functions/unit8ArrayFunc';
import PermissionCheck from '@src/utils/functions/permission';
import socketValue from '@src/constant/socket';
import AudioRecord from 'react-native-audio-record';

// < ------------------------  finish ---------------------- >

// < ----------------  create audio ------------- >
const recorder = new Recorder();

// < ------------------------  finish ---------------------- >

const ChatGpt = ({navigation}) => {
  // < ----------------  State Base ------------- >
  const [messageList, setMessageList] = useState<any>([]);
  const [pancMessage, setPancMessage] = useState<any>('');
  const scrollViewRef = useRef();

  const [recordStatus, setRecordStatus] = useState(false);
  const [baseRecordStatus, setBaseRecordStatus] = useState(false);
  // < ------------------------  finish ---------------------- >

  // < ------------------------  Socket Operation ---------------------- >

  const [ws, setWs] = React.useState<WebSocket>(null);

  const getWebSocket = () => {
    const socket = new WebSocket(
      'wss://nesibe-yilmaz-tokyo.wagtail.test.core.devops.sestek.com.tr/project-runner/chatGPTTr',
    );

    socket.onopen = () => {
      console.log('Web Socket open');
      socket.send(JSON.stringify(socketValue));
    };

    socket.onmessage = e => {
      const Jsondata = JSON.parse(e?.data);
      const contentMessage = Jsondata?.event?.data;
      const text: string = Jsondata?.event?.data?.text;
      const oldMessageList = messageList;
      if (text) {
        console.log(text);
        setPancMessage(text);
        if (contentMessage?.text_attributes === 'recognized, punctuated') {
          // our message
          messageList?.push({
            value: text,
            position: 'right',
            type: 'message',
          });
          setMessageList([...oldMessageList]);
          setPancMessage('');
        }
      }
      const chatResponse = contentMessage?.chatGPTResult;
      if (chatResponse) {
        // chat message
        console.log(chatResponse);
        oldMessageList?.push({
          value: chatResponse[0].message?.content,
          position: 'left',
          type: 'message',
        });
        setMessageList([...oldMessageList]);
        setPancMessage('');
      }
    };

    socket.onclose = e => {
      console.log('socket bağlantısı kapatıldı:', e.reason);
    };
    socket.onerror = e => {
      console.error('socket hatası:', e.message);
    };
    return socket;
  };

  React.useEffect(() => {
    if (ws === null) {
      connectWebSocket();
    }

    return async () => {
      await handleStop();
    };
  }, []);

  const connectWebSocket = () => {
    let wsTemp = getWebSocket();
    setWs(wsTemp);
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
  const closeModalButton = async () => {
    await handleStop();
    setIsModalOpen(false);
    navigation.navigate('Home');
  };

  // < ------------------------  finish ---------------------- >

  // < ------------------------  Socket send Audio ---------------------- >

  const options = {
    sampleRate: 8000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: 'test.wav',
  };

  AudioRecord.init(options);

  AudioRecord.on('data', async data => {
    const convertedAudio = await Uint8ArrayFromBase64(data);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(convertedAudio);
    }
  });

  const start = () => {
    try {
      AudioRecord.start();
      console.log('Kayıt Başladı');
    } catch (error) {}
  };

  const stop = async () => {
    try {
      const audioFile = await AudioRecord.stop();
      console.log(audioFile);
    } catch (error) {
      console.log(error);
    }
  };

  // < ------------------------  finish ---------------------- >

  // < ------------------------  Start Record Button ---------------------- >

  const handleRecord = async () => {
    PermissionCheck();
    if (ws) {
      connectWebSocket();
    }
    setRecordStatus(true);
    setBaseRecordStatus(true);
    start();
  };
  const handleStop = async () => {
    try {
      //await recorder.onStopRecord('sound');
      // o an ki gönderilecek
      await stop();
      ws.close();
      setRecordStatus(false);
      setBaseRecordStatus(false);
      setMessageList([]);
      setPancMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  // < ------------------------  finish ---------------------- >

  const PancComponent = React.memo(() => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignContent: 'center',
          padding: 10,
        }}>
        <Text style={styles.pancMessage}>{pancMessage}</Text>
      </View>
    );
  });

  const ClosedButton = () => {
    return (
      <TouchableOpacity onPress={closeModalButton}>
        <Image
          source={Close}
          resizeMode="stretch"
          style={{
            ...styles.Close,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="slide" visible={isModalOpen}>
      <ImageBackground
        source={BackgroundChatgpt}
        style={{flex: 1, resizeMode: 'cover'}}>
        <SafeAreaView style={styles.SafeArea(baseRecordStatus)}>
          <View style={styles.upBar}>
            <Text style={styles.title}>VoiceGPT</Text>
            <ClosedButton />
          </View>
          {baseRecordStatus ? (
            <ScrollView
              style={styles.scroll}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }>
              <MessageBoxBody messages={messageList} />
            </ScrollView>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.recorder}>
                <TouchableOpacity onPress={() => handleRecord()}>
                  <Image
                    source={BigRecord}
                    resizeMode="stretch"
                    style={styles.BaseMic}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 18,
                    lineHeight: 21,
                    marginTop: 10,
                  }}>
                  Lets Talk!
                </Text>
              </View>
            </View>
          )}
        </SafeAreaView>
      </ImageBackground>
      {baseRecordStatus && (
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
                onPress={() => handleStop()}>
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
          {pancMessage && <PancComponent />}
        </View>
      )}
    </Modal>
  );
};

// < ------------------------  Style---------------------- >

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  SafeArea: baserecord => ({
    flex: 1,
    backgroundColor: baserecord ? '#E9EDF0' : '',
  }),
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
  BaseMic: {
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').width * 0.4,
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
