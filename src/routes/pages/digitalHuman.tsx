import React from 'react';
import { View, Modal, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import Toast from 'react-native-toast-message';
import { useAppSelector} from '@src/utils/redux/hooks';
import useModalCloseAvatarStore from '@src/zustandStore/avatar/store';


const DigitalHuman = ({navigation}) => {
  const handleMessage = (event: any) => {
    // WebView'dan gelen mesajı işleyin
    console.log(event.nativeEvent.data);
    if (event.nativeEvent.data == 'exit') {
      setIsModalAvatarOpen(false);
      navigation.navigate('Home');
    }
  };

  const handleError = () => {
    setIsModalAvatarOpen(false);
    navigation.navigate('Home');
    Toast.show({
      type: 'error',
      text1: 'Webview bağlantısı kurulamadı ⚠️',
    });
  };

  const {isModalAvatarOpen, setIsModalAvatarOpen} = useModalCloseAvatarStore();
  const webchat = useAppSelector(state => state.webchat);
  var avatarURL = `https://demo-app.sestek.com/sestek-avatar-mobile.html?onlyRecordButton=true` 
  if(webchat.personaId !== ""){
    avatarURL = avatarURL +`&showProjectName=${webchat.project}&personaId=${webchat.personaId}`
  }
  console.log(avatarURL)
  return (
    <Modal animationType="slide" visible={isModalAvatarOpen}>
      <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'blue'}}>
              <WebView
                originWhitelist={['*']}
                source={{
                  uri: avatarURL,
                }}
                allowsFullscreenVideo={true}
                allowsInlineMediaPlayback={true}
                allowsAirPlayForMediaPlayback={true}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
                allowFileAccess={true}
                mediaCapturePermissionGrantType="grant"
                mediaPlaybackRequiresUserAction={false}
                allowsProtectedMedia={true}
                javaScriptEnabled={true}
                androidHardwareAccelerationDisabled={false}
                domStorageEnabled={true}
                mixedContentMode="always"
                thirdPartyCookiesEnabled={true}
                blur={true}
                cacheMode="LOAD_DEFAULT"
                onHttpError={error => {
                  handleError();
                }}
                onMessage={event => {
                  handleMessage(event);
                }}
                onError={e => {
                  handleError();
                }}
              />
            </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default DigitalHuman;
