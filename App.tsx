import WebchatModal from '@src/components/webchatModal';
import Navigator from '@src/routes/navigator';
import { store } from '@src/utils/redux/store';
import * as React from 'react';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import BackgroundGeolocation, { Subscription } from "react-native-background-geolocation";

export default function App() {

  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation((location) => {
      console.log('[onLocation]', location);
    })

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      locationAuthorizationRequest: 'Always',
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    }).then((state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
    });

    BackgroundGeolocation.start();
  }, []);

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