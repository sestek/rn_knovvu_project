import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import Settings from '../../../routes/pages/settings';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

jest.useFakeTimers();
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

  test('rendered for Settings Page', async () => {
    store = mockStore(initialState);
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );

    expect(getByText('DEFAULT CONFIGURATION'));
    expect(getByText('CUSTOMIZE CONFIGURATION'));
  });

  test('settings default confirigation save test', async () => {
    store = mockStore(initialState);
    const {getByText, getByTestId, queryByDisplayValue} = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );

    const input = getByTestId('tenant');
    await waitFor(() => {
      fireEvent.changeText(input, {target: {value: 'Test'}});
    });

    await waitFor(() => {
      const input2 = getByTestId('project');

      fireEvent.changeText(input2, {target: {value: 'Test PRJ'}});
    });

    await waitFor(
      () => {
        const input3 = getByTestId('save');

        fireEvent.press(input3);
      },
      {timeout: 6000},
    );

 
    // setTimeout(() => {
   
    // }, 2000);
  

    await waitFor(() => {
      const input4 = getByTestId('reset');

      fireEvent.press(input4);
    });
    await waitFor(() => {
      const input4 = getByTestId('reset');

      fireEvent.press(input4);
    });
    setTimeout(() => {
      expect(screen.getByText('Warning'));
      expect(
        screen.getByText(
          'If you do a reset, the settings will return to the settings when the application was first installed.',
        ),
      );


      jest.runAllTimers();
    }, 1500);



    console.log(input.props.value.target.value);
 
  });

  test('mock setTimeout test', () => {
    store = mockStore(initialState);
    const {getByText, getByTestId, queryByDisplayValue} = render(
      <Provider store={store}>
        <Settings  />
      </Provider>,
    );

    jest.useFakeTimers();
    setTimeout(() => {
      const input3 = getByTestId('incomingtextColor');

      fireEvent.press(input3);

    screen.debug(undefined, Infinity)

      console.log('TIME IS UP');
    }, 3000);
    jest.runAllTimers();


  });
});
