import WebchatModal from '@src/components/webchatModal';
import Navigator from '@src/routes/navigator';
import {store} from '@src/utils/redux/store';
import * as React from 'react';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import useRequest from '@src/hooks/apiHook';
import constants from './src/constant/api';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {View, Text} from 'react-native';
import {ChatModalProps} from 'rn-sestek-webchat';

export default function App() {
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'pink'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    tomatoToast: ({text1, props}) => (
      <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };
  const {getRequestToken} = useRequest();

  React.useEffect(() => {
    getRequestToken(constants.apiUrl, constants.requestData);
  }, []);

  const modalRef = React.useRef<ChatModalProps>(null);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <FlashMessage position="top" />
      <SafeAreaProvider>
        <Provider store={store}>
          <WebchatModal modalRef={modalRef} />
          <Navigator modalRef={modalRef} />
          <Toast config={toastConfig} />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
