import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import Settings from '../../../routes/pages/settings';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Alert} from 'react-native';

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
    const {getByText} = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );

    expect(getByText('DEFAULT CONFIGURATION'));
    expect(getByText('CUSTOMIZE CONFIGURATION'));
  });

  test('settings default confirigation save test', async () => {
    store = mockStore(initialState);
    const {getByTestId} = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );

    const tenantButton = getByTestId('tenant');
    await waitFor(() => {
      fireEvent.changeText(tenantButton, {target: {value: 'Test'}});
    });

    await waitFor(() => {
      const projectButton = getByTestId('project');
      fireEvent.changeText(projectButton, {target: {value: 'Test PRJ'}});
    });

    await waitFor(() => {
      const saveButton = getByTestId('save');
      fireEvent.press(saveButton);
    });

    expect(tenantButton.props.value.target.value).toBe('Test');

    await waitFor(
      () => {
        const resetButton = getByTestId('reset');

        fireEvent.press(resetButton);
      },
      {timeout: 6000},
    );

    jest.useFakeTimers();
    setTimeout(() => {
      expect(Alert.alert).toHaveBeenCalled();
    }, 3000);
    jest.runAllTimers();

   
  });


  test('Change URL ', async () => {
    store = mockStore(initialState);
    const {getByText} = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );

    const ndaButton = getByText('Nda');
    await waitFor(() => {
      fireEvent.press(ndaButton);
    });
   
  });


 
});
