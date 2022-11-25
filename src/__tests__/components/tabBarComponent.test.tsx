import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
} from '@testing-library/react-native';
import TabbarComponent from '../../components/tabBarComponent';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

describe('components/tabbarComponent', () => {
  afterEach(() => {
    cleanup();
  });

  const state = {
    history: [
      {
        key: 'Home-YTk3fVCypIqpXwcG19MC7',
        type: 'route',
      },
      {
        key: 'About-VM2TWFO0LcZy5PK5mc4MI',
        type: 'route',
      },
    ],
    index: 1,
    key: 'tab-KWEIB8yQJ7Z7Z1PFzWRMW',
    routeNames: ['Home', 'About', 'Contact Us', 'Settings', 'Knovvu'],
    routes: [
      {
        key: 'Home-YTk3fVCypIqpXwcG19MC7',
        name: 'Home',
        params: 'undefined',
      },
      {
        key: 'About-VM2TWFO0LcZy5PK5mc4MI',
        name: 'About',
        params: 'undefined',
      },
      {
        key: 'Contact Us--mLrSB7LsGlkAvRtdLMCJ',
        name: 'Contact Us',
        params: 'undefined',
      },
      {
        key: 'Settings-eScJTqybSvW1rt2Kiwyrh',
        name: 'Settings',
        params: 'undefined',
      },
      {
        key: 'Knovvu-MnbmtSvZVx5DJ_r8-NrZD',
        name: 'Knovvu',
        params: 'undefined',
      },
    ],
    stale: false,
    type: 'tab',
  };

  const desc = {
    'About-VM2TWFO0LcZy5PK5mc4MI': {
      route: {
        key: 'About-VM2TWFO0LcZy5PK5mc4MI',
        name: 'About',
        params: 'undefined',
        tabBarLabel: 'deneme',
      },
      options: {
        headerRight: ['Function headerRight'],
        headerTintColor: '#7f81ae',
        tabBarActiveTintColor: '#abaee6',
        tabBarInactiveTintColor: '#ec008c',
        title: 'About',
      },
    },
    'Contact Us--mLrSB7LsGlkAvRtdLMCJ': {
      route: {
        key: 'Contact Us--mLrSB7LsGlkAvRtdLMCJ',
        name: 'Contact Us',
        params: 'undefined',
        tabBarLabel: 'deneme2',
      },
      options: {
        headerRight: ['Function headerRight'],
        headerTintColor: '#7f81ae',
        tabBarActiveTintColor: '#abaee6',
        tabBarInactiveTintColor: '#ec008c',
        title: 'Contact Us',
      },
    },
    'Home-YTk3fVCypIqpXwcG19MC7': {
      route: {
        key: 'Home-YTk3fVCypIqpXwcG19MC7',
        name: 'Home',
        params: 'undefined',
        tabBarLabel: 'deneme3',
      },
      options: {
        headerRight: ['Function headerRight'],
        headerTintColor: '#7f81ae',
        tabBarActiveTintColor: '#abaee6',
        tabBarInactiveTintColor: '#ec008c',
        title: 'Home',
      },
    },
    'Knovvu-MnbmtSvZVx5DJ_r8-NrZD': {
      route: {
        key: 'Knovvu-4hpGAS8cyp5TRHoi0hsxN',
        name: 'Knovvu',
        params: 'undefined',
        tabBarLabel: 'deneme4',
      },
      options: {
        headerRight: ['Function headerRight'],
        headerTintColor: '#7f81ae',
        tabBarActiveTintColor: '#abaee6',
        tabBarInactiveTintColor: '#ec008c',
        title: '',
      },
    },
    'Settings-eScJTqybSvW1rt2Kiwyrh': {
      route: {
        key: 'Settings-eScJTqybSvW1rt2Kiwyrh',
        name: 'Settings',
        params: 'undefined',
        tabBarLabel: 'deneme5',
      },
      options: {
        headerRight: ['Function headerRight'],
        headerTintColor: '#7f81ae',
        tabBarActiveTintColor: '#abaee6',
        tabBarInactiveTintColor: '#ec008c',
        title: 'Settings',
      },
    },
  };

  const navi = {
    emit: jest.fn(),
    navigate: jest.fn(),
  };

  const initialState = {
    theme: {
      color_100: 'pink',
      color_200: 'black',
      color_300: 'blue',
    },
    main: {
      modalVisible: jest.fn(),
    },
  };
  const mockStore = configureStore();
  let store;

  test('rendered for tabbarComponenet', async () => {
    store = mockStore(initialState);
    const {getByText} = render(
      <Provider store={store}>
        <TabbarComponent state={state} descriptors={desc} navigation={navi} />
      </Provider>,
    );

    expect(getByText('Home'));
    expect(getByText('About'));
    expect(getByText('Contact Us'));
    expect(getByText('Settings'));
  });

  test('Knovvu page on press', async () => {
    store = mockStore(initialState);

    const {getByTestId} = render(
      <Provider store={store}>
        <TabbarComponent state={state} descriptors={desc} navigation={navi} />
      </Provider>,
    );
    let button = getByTestId('Knovvu');
    fireEvent.press(button);
  });

  test('(!isFocused && !event?.defaultPrevented) for the if blog to work', async () => {
    store = mockStore(initialState);

    const {getByTestId} = render(
      <Provider store={store}>
        <TabbarComponent state={state} descriptors={desc} navigation={navi} />
      </Provider>,
    );
    let aboutButton = getByTestId('About');
    fireEvent.press(aboutButton);

    let knovvuButton = getByTestId('Knovvu');
    fireEvent.press(knovvuButton);

    let homeButton = getByTestId('Home');
    fireEvent.press(homeButton);
  });
});
