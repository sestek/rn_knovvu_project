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
} from 'react-native';
import {Mic} from '@src/assests';
// import Recorder from '@src/service/Recorder';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-fetch-blob';
import createUUID from '@src/utils/functions/createUUID';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatGpt = ({navigation}) => {
  const recorder = new AudioRecorderPlayer();
  const [audioData, setAudioData] = useState(null);
  const requestToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('tokenımız :', token);
    return token;
  };
  const socket = new WebSocket(
    'wss://nesibe-yilmaz-tokyo.wagtail.test.core.devops.sestek.com.tr/project-runner/chatgpt',
    {
      headers: {
        ['Authorization']: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwNDhENDI5NjI0QzAzRDQ3NzIyNEQyOEQ5REFDMEY3IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2OTQxNzE2MTEsImV4cCI6MTcyNTcwNzYxMSwiaXNzIjoiL2NvcmUtYmFja2VuZC1hdXRoIiwiYXVkIjoiV2FndGFpbCIsImNsaWVudF9pZCI6IldhZ3RhaWxfVGVzdCIsImlhdCI6MTY5NDE3MTYxMSwic2NvcGUiOlsiV2FndGFpbCJdfQ.rxQj4xbm7r9tFsFD-RlVxyOZKRViERryuo9biGwsLRLCdTZhoOEJuqhoS-dHoWxGsm1Tw5rwV0p9mLnDBewxm7vWsolK9N-F2y1xSxpyDG6azLuR-rGD2wlfkRTvR-T5exI3OQ4G8AQM86k3Wrw5pk2XLKc8zh-1ju1TFtblTLTX68sDChKrSZWbHvxcnilrR0Y_gINtRlSjfX1dSibMcQ-hIctQqIVHokwbTj1EfYsdsVBMn61XCXnNPN_QyNvW2o01yxILeCKgQYyetTXImUlnk-KsC_e33vU2eAXa5xjPoZ_5xjtnLE1_m0yFmZPN_2-NOdI8qXif1XTan5SHGA`,
      },
    },
  );

  console.log(socket);

  const handleRecord = async () => {
    //webSocketStart();

    try {
      let dirsFOLDER = RNFetchBlob.fs.dirs;
      let folderPath = dirsFOLDER.CacheDir + '/sestek_bot';
      RNFetchBlob.fs
        .mkdir(folderPath)
        .then(res => console.log(res))
        .catch(err => console.log(err));

      const dirs = RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot';
      const path = Platform.select({
        ios: 'sestek_bot/' + createUUID() + '.m4a',
        android: `${dirs}/${createUUID()}.wav`,
      });

      await recorder.startRecorder(path);
      recorder.addRecordBackListener((e: any) => {
        console.log('record : ', e.currentPosition);
        console.log('ms : ', recorder.mmssss(Math.floor(e.currentPosition)));
        //return;
      });
    } catch (error) {
      console.log(error);
    }
    // recorder.onStartRecord();
    // setInterval(() => {

    // }, 500);
  };

  const handleSend = async () => {
    const result = await recorder.stopRecorder();
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

  useEffect(() => {
    try {
      socket.onopen = (event: any) => {
        //socket.send(JSON.stringify(apiCall));
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
        console.log('WebSocket mesajı alındı:', e.data);
      };
      socket.onclose = e => {
        console.log('WebSocket bağlantısı kapatıldı:', e.reason);
      };
      socket.onerror = e => {
        console.error('WebSocket hatası:', e.message);
      };
    } catch (error) {
      console.log(error);
    }
    return () => {
      socket.close();
    };
  }, []);

  const webSocketStart = async () => {
    // const apiCall = {
    //   event: 'bts:subscribe',
    //   data: {channel: 'order_book_btcusd'},
    // };
  };

  useEffect(() => {}, []);
  return (
    <View style={styles.main}>
      <ScrollView style={styles.scroll}>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              exercitationem repellendus officiis! Quod, reprehenderit!
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Tayfunnn ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
      </ScrollView>
      {true && (
        <View style={{}}>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum,
              animi aperiam? Tenetur explicabo, nulla maxime autem error a rem
              nemo.
            </Text>
          </Card>
        </View>
      )}
      <View style={styles.recorder}>
        <TouchableOpacity onPress={() => handleRecord()}>
          <Image source={Mic} resizeMode="stretch" style={styles.mic} />
        </TouchableOpacity>
      </View>
      <View style={styles.recorder}>
        <TouchableOpacity onPress={() => handleSend()}>
          <Text>Getir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red',
    position: 'relative',
  },
  recorder: {
    alignItems: 'center',
    padding: 8,
  },
  mic: {
    width: Dimensions.get('screen').width * 0.11,
    height: Dimensions.get('screen').width * 0.11,
  },
});

export default ChatGpt;
