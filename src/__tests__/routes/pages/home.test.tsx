import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import Home from '../../../routes/pages/home';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

describe('routes/Settings', () => {
  afterEach(() => {
    cleanup();
  });

  const initialState = {
    theme: {
      color_100: 'pink',
      color_200: 'black',
      color_300: 'blue',
    },
  };
  const mockStore = configureStore();
  let store;

  const navi = {
    emit: jest.fn(),
    navigate: jest.fn(),
  };

  test('settings default confirigation save test', async () => {
    store = mockStore(initialState);
    const {getByText, getByTestId, queryByDisplayValue} = render(
      <Provider store={store}>
        <Home navigation={navi} />
      </Provider>,
    );

    screen.debug(undefined,Infinity)

   
  });

 
});
