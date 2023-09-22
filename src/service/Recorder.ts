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
  recorderBase: AudioRecorderPlayer;

  constructor() {
    this.recorderBase = new AudioRecorderPlayer();
    let dirsFOLDER = RNFetchBlob.fs.dirs;
    let folderPath = dirsFOLDER.CacheDir + '/sestek_bot';
    RNFetchBlob.fs
      .mkdir(folderPath)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  onStartRecord = async () => {
    const dirs = RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot';
    const path = Platform.select({
      ios: 'sestek_bot/' + 'sound' + '.m4a',
      android: `${dirs}/sound.mp3`,
    });
    console.log(path);
    await this.recorderBase.startRecorder(path);
    this.recorderBase.addRecordBackListener((e: any) => {
      console.log('record : ', e.currentPosition);
      console.log(
        'ms : ',
        this.recorderBase.mmssss(Math.floor(e.currentPosition)),
      );
    });
  };

  onStopRecord = async () => {
    await this.recorderBase.stopRecorder();
    this.recorderBase.removeRecordBackListener();
    const soundPath = Platform.select({
      ios: RNFetchBlob.fs.dirs.CacheDir + '/sestek_bot/sound.m4a',
      android: RNFetchBlob.fs.dirs.CacheDir + `/sound.mp3`,
    });
    console.log('stop');
    return soundPath;
  };

  recordToBase64 = async (soundPath: any) => {
    const audioToBase64 = await RNFetchBlob.fs.readFile(soundPath, 'base64');
    return audioToBase64;
  };
}

export default Recorder;
