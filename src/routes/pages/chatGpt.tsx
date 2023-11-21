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
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Close,
  LottieRecord,
  Mic,
  StopMic,
  BigRecord,
  BackgroundChatgpt,
  Copy,
} from '@src/assests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import MessageBoxBody from '@src/components/chatgpt/MessageBoxBody';
import useModalCloseStore from '../../zustandStore/chatgpt/store';
import Recorder from '@src/service/Recorder';
import CustomWebSocket from '@src/service/CustomWebsocket';
import Uint8ArrayFromBase64 from '@src/utils/functions/unit8ArrayFunc';
import PermissionCheck from '@src/utils/functions/permission';
import socketValue from '@src/constant/socket';
import AudioRecord from 'react-native-audio-record';
import {getUniqueId} from 'react-native-device-info';
import axios from 'axios';
import Toast from 'react-native-toast-message';

// < ------------------------  finish ---------------------- >

const ChatGpt = ({navigation}) => {
  // < ----------------  State Base ------------- >
  const [messageList, setMessageList] = useState<any>([]);
  const [pancMessage, setPancMessage] = useState<any>('');
  const scrollViewRef = useRef();
  const [checkPermissionId, setCheckPermissionId] = useState(false);
  const [recordStatus, setRecordStatus] = useState(false);
  const [baseRecordStatus, setBaseRecordStatus] = useState(false);
  const [copyText, setCopyText] = useState('');
  const [socketData, sendSocketData] = useState({})
  // < ------------------------  finish ---------------------- >

  // < ------------------------  Socket Operation ---------------------- >

  const [ws, setWs] = React.useState<WebSocket>(null);

  // < ------------------------  Token  ---------------------- >

  const requestToken = async () => {
    const token = await AsyncStorage.getItem('token');
    sendSocketData({ ...socketValue, token: token }); // token değişkenin değerini kendinize göre ayarlayın
  };

  // < ------------------------  finish ---------------------- >

  const getWebSocket = () => {
    const socket = new WebSocket(
      'wss://dataflow.eu.knovvu.com/project-runner/chatGPTTr',
    );

    socket.onopen = () => {
      socket.send(JSON.stringify(socketData));
    };

    socket.onmessage = e => {
      const Jsondata = JSON.parse(e?.data);
      const contentMessage = Jsondata?.event?.data;
      const text: string = Jsondata?.event?.data?.text;
      const oldMessageList = messageList;
      if (text) {
        console.log(text);
        setPancMessage(text);
        scrollViewRef.current.scrollToEnd({animated: true});
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
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    };

    socket.onclose = e => {
      console.log('socket bağlantısı kapatıldı:', e.reason);
    };
    socket.onerror = e => {
      Toast.show({
        type: 'error',
        text1: 'Socket bağlantısı kurulamadı ⚠️',
      });
      closeModalButton();
    };
    return socket;
  };

  React.useEffect(() => {
    requestToken();
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

  // < ------------------------  Modal Control  ---------------------- >

  const {isModalOpen, setIsModalOpen} = useModalCloseStore();
  const closeModalButton = async () => {
    await handleStop();
    await checkPermissionIdFunc();
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

  // < ------------------------  Start Stop Record Button ---------------------- >

  const handleRecord = async () => {
    console.log('tetiklendi');
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
      if (recordStatus) {
        await stop();
      }
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

  // < ------------------------  Copy device Id Button ---------------------- >
  const checkPermissionIdFunc = async () => {
    try {
      const deviceId = await getUniqueId();
      const response = await axios.get(
        'https://api-gateway.sestek.com/check-voicegpt/' + deviceId,
      );
      if (response?.data == true) {
        setCheckPermissionId(true);
      }
    } catch (error) {
      setCheckPermissionId(false);
      // console.log('hata : ', error);
    }
  };

  useEffect(() => {
    checkPermissionIdFunc();
  }, []);

  if (isModalOpen) {
    checkPermissionIdFunc();
  }

  const secondCopyText = () => {
    setTimeout(() => {
      setCopyText('');
    }, 2500);
  };

  const copyToClipboard = async () => {
    const id = await getUniqueId();
    console.log(id);
    Clipboard.setString(id);
    Toast.show({
      type: 'success',
      text1: 'ID KOPYALANDI',
    });
    setCopyText('Kopyalandı');
    secondCopyText();
  };

  // < ------------------------  finish ---------------------- >

  const PancComponent = () => {
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
  };

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
                {checkPermissionId ? (
                  <>
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
                        fontSize: 16,
                        lineHeight: 21,
                        marginTop: 10,
                      }}>
                      Lets Talk!
                    </Text>
                  </>
                ) : (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 10,
                      borderRadius: 10,
                      marginLeft: 30,
                      marginRight: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        lineHeight: 40,
                        color: '#E26310',
                        fontWeight: 'bold',
                      }}>
                      Kullanabilmek için id'yi sestek ekibine iletin
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: 130,
                        height: 50,
                        backgroundColor: '#F0F0F0',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginTop: 20,
                        borderRadius: 10,
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                      onPress={() => copyToClipboard()}>
                      <Text style={{fontWeight: 'bold'}}>Kopyala</Text>
                      <Image
                        source={Copy}
                        resizeMode="stretch"
                        style={styles.Close}
                      />
                    </TouchableOpacity>
                    {copyText && (
                      <Text
                        style={{
                          fontSize: 15,
                          textAlign: 'center',
                          lineHeight: 40,
                          color: 'green',
                          fontWeight: 'bold',
                        }}>
                        {copyText}
                      </Text>
                    )}
                  </View>
                )}
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
