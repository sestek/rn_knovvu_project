import createUUID from '@src/utils/functions/createUUID';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import type {
  AudioSet,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-fetch-blob';

const Sound = () => {
  const [options, setOptions] = useState({
    sampleRate: 8000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: '/sestek_bot_audio/' + createUUID() + '.wav',
  });

  AudioRecord.init(options);

  AudioRecord.on('data', async data => {});

  const start = () => {
    try {
      AudioRecord.start();
      console.log('Kayıt Başladı');
    } catch (error) {}
  };

  const audioRecorderPlayer = new AudioRecorderPlayer();
  useEffect(() => {
    RNFetchBlob.fs.mkdir(RNFetchBlob.fs.dirs.DocumentDir + '/sestek_bot_audio');
  }, []);
  
  const stop = async () => {
    try {
      const audioFile = await AudioRecord.stop();
      setOptions({
        ...options,
        wavFile: '/sestek_bot_audio/' + createUUID() + '.wav',
      });

      await audioRecorderPlayer.startPlayer('file://' + audioFile);

      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        console.log('playBackListener', e);
      });
      console.log(audioFile);
    } catch (error) {
      console.log(error);
    }
  };

  const packRecord = async () => {
    try {
      const uri = await audioRecorderPlayer.startRecorder();

      audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
        // console.log('record-back', e);
        console.log('record : ', e);
      });
      console.log(`uri: ${uri}`);
    } catch (error) {}
  };

  const play = async () => {
    try {
      await audioRecorderPlayer.startPlayer(
        'file:///Users/tayfun/Library/Developer/CoreSimulator/Devices/E3B9F29B-31E5-469A-8D78-8545FE3CAB78/data/Containers/Data/Application/7FBE9623-5933-4F76-AABD-B12EE87814D0/Documents/test.wav',
      );

      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        console.log('playBackListener', e);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{backgroundColor: 'red', padding: 10}}
        onPress={() => start()}>
        <Text>Record</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: 'green', padding: 10, marginTop: 10}}
        onPress={() => packRecord()}>
        <Text>Record pack</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: 'grey', padding: 10, marginTop: 10}}
        onPress={() => stop()}>
        <Text>Stop And Play</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: 'grey', padding: 10, marginTop: 10}}
        onPress={() => play()}>
        <Text>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sound;
