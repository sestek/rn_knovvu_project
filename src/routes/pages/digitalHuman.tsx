import useModalCloseAvatarStore from '@src/zustandStore/avatar/store';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, Text, View, Modal, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

const DigitalHuman = ({navigation}) => {
  const handleMessage = (event: any) => {
    // WebView'dan gelen mesajı işleyin
    console.log(event.nativeEvent.data);
    if (event.nativeEvent.data == 'exit') {
      setIsModalAvatarOpen(false);
      navigation.navigate('Home');
    }
  };

  const {isModalAvatarOpen, setIsModalAvatarOpen} = useModalCloseAvatarStore();

  return (
    <Modal animationType="slide" visible={isModalAvatarOpen}>
      <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'blue'}}>
            <WebView
              originWhitelist={['*']}
              source={{
                uri: 'https://demo-app.sestek.com/sestek-avatar-mobile.html',
              }}
              allowsFullscreenVideo={true}
              allowsInlineMediaPlayback={true}
              allowsAirPlayForMediaPlayback={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              allowFileAccess={true}
              mediaCapturePermissionGrantType="grant"
              blur={true}
              onMessage={event => {
                handleMessage(event);
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default DigitalHuman;
