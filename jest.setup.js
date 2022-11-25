//import nock from 'nock';
//import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

//nock.disableNetConnect();
//

// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

///Jest: Invariant Violation: new NativeEventEmitter() requires a non-null argument. #367
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

////react-native-device-info: nativemodule rndeviceinfo is null jest
 jest.mock('react-native-device-info', () => {
   return {
     __esModule: true,
     default: jest.fn(() => {}),
     getVersion: ()=>'1.0.1',
     getBuildNumber: ()=>'1'
   };
 });


 /////async-storage
 jest.mock('@react-native-async-storage/async-storage', () =>
 require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);


//////////

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@rneui/themed');
jest.mock('react-native-color-picker');



//jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

/*jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key) => key}),
}));

jest.mock('react-native-bootsplash', () => {
  return {
    show: jest.fn().mockResolvedValueOnce(),
    hide: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  };
});*/