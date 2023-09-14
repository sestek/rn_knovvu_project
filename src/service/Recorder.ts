import {Platform} from 'react-native';
import createUUID from '../utils/functions/createUUID';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-fetch-blob';

class Recorder {
  recordSecs: number = 0;
  recordTime: string = '';
  currentPositionSec: number = 0;
  currentDurationSec: number = 0;
  playTime: string = '';
  duration: string = '';

  constructor() {}

  listening = async () => {
    const recorder = new AudioRecorderPlayer();
    const dirs = RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot_audio';
    const path = Platform.select({
      ios: 'sestek_bot_audio/' + createUUID() + '.wav',
      android: `${dirs}/${createUUID()}.wav`,
    });
    await recorder.startRecorder(path).then(result => {
      if (result) {
        console.log(result);
      }
    });
    // AudioRecorderPlayer.addRecordBackListener((e: any) => {
    //   this.recordSecs = e.currentPosition;
    //   this.recordTime = AudioRecorderPlayer.mmssss(
    //     Math.floor(e.currentPosition),
    //   );
    //   return;
    // });
  };

  onStartRecord = async () => {
    const dirs = RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot_audio';
    const path = Platform.select({
      ios: 'sestek_bot_audio/' + createUUID() + '.wav',
      android: `${dirs}/${createUUID()}.wav`,
    });
    await AudioRecorderPlayer.startRecorder(path);
    AudioRecorderPlayer.addRecordBackListener((e: any) => {
      this.recordSecs = e.currentPosition;
      this.recordTime = AudioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      );
      return;
    });
  };

  saveLocalFileAudio = (data: string) => {
    const dirs = RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot_audio';
    const path = `${dirs}/${createUUID()}.wav`;
    RNFetchBlob.fs.createFile(path, data, 'base64').then((res: any) => {});
    return path;
  };

  onStopRecord = async () => {
    const result = await AudioRecorderPlayer.stopRecorder();
    AudioRecorderPlayer.removeRecordBackListener();
    this.recordSecs = 0;
    const dirFile = result.split('/');
    const data =
      RNFetchBlob.fs.dirs.CacheDir +
      '/sestek_bot_audio' +
      '/' +
      dirFile[dirFile.length - 1];
    return {url: result, data: await RNFetchBlob.fs.readFile(data, 'base64')};
  };

  onStartPlay = async (urlData?: string) => {
    const msg = await AudioRecorderPlayer.startPlayer(urlData);
    AudioRecorderPlayer.addPlayBackListener((e: any) => {
      this.currentPositionSec = e.currentPosition;
      this.currentDurationSec = e.duration;
      this.playTime = AudioRecorderPlayer.mmssss(Math.floor(e.currentPosition));
      this.duration = AudioRecorderPlayer.mmssss(Math.floor(e.duration));
      return;
    });
  };

  onPausePlay = async () => {
    await AudioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    AudioRecorderPlayer.stopPlayer();
    AudioRecorderPlayer.removePlayBackListener();
  };
}

export default Recorder;
