import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '@src/routes/pages/home';

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

  test('rendered for Home Page', async () => {
    store = mockStore(initialState);
    const {getByText} = render(
      <Provider store={store}>
        <Home navigation={navi} />
      </Provider>,
    );

    expect(getByText('Know Your Customers.'));
    expect(getByText('Know Your Agents.'));
    expect(getByText('Leading companies trust our conversational technologies'));
    expect(getByText('We deliver.Period.'));
    expect(getByText('With our 22 years of experience, we are proud of our project delivery rate of 100%.'));
   
  });
  test('Youtube Button Click', async () => {
    store = mockStore(initialState);
    const { getByTestId} = render(
      <Provider store={store}>
        <Home navigation={navi} />
      </Provider>,
    );

    const saveButton = getByTestId('youtube');
    fireEvent.press(saveButton);
    
   
  });
 
});
