import WebchatModal from '@src/components/webchatModal';
import Navigator from '@src/routes/navigator';
import { store } from '@src/utils/redux/store';
import * as React from 'react';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlashMessage position="top" />
      <SafeAreaProvider >
        <Provider store={store}>
          <WebchatModal />
          <Navigator />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}