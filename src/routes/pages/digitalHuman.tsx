import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const DigitalHuman = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <WebView
          originWhitelist={['*']}
          source={{
            uri: `https://demo-app.sestek.com/sestek-avatar.html`,
          }}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          allowsAirPlayForMediaPlayback={true}
          allowFileAccessFromFileURLs={true}
          mediaCapturePermissionGrantType="grant"
        />
      </View>
    </View>
  );
};

export default DigitalHuman;
