import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
} from '@testing-library/react-native';
import About from '../../../routes/pages/about';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

describe('routes/About', () => {

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

  test('rendered for About Page', async () => {
    store = mockStore(initialState);
    const {getByText} = render(
      <Provider store={store}>
        <About navigation={navi} />
      </Provider>,
    );
    expect(getByText('Call Us On'));
    expect(getByText('United Kingdom'));
    expect(getByText('Europe & Turkey'));
    expect(getByText('Middle East & Africa'));
    expect(getByText('contact@knovvu.com'));
    expect(getByText('+44 7897 027400'));
    expect(getByText('+1 315 961 84 04'));
    expect(getByText('+90 212 286 25 45'));
    expect(getByText('+971 4 390 1646'));

  });

  test('click on phone numbers', async () => {
    store = mockStore(initialState);
    const {getByText} = render(
      <Provider store={store}>
        <About navigation={navi} />
      </Provider>,
    );

    let unitedKingdomTel = getByText('+44 7897 027400');
    fireEvent.press(unitedKingdomTel);
    
    let unitedStatesTel = getByText('+1 315 961 84 04');
    fireEvent.press(unitedStatesTel);

    let europaTurkeyTel = getByText('+90 212 286 25 45');
    fireEvent.press(europaTurkeyTel);

    let middileEastAfricaTel = getByText('+971 4 390 1646');
    fireEvent.press(middileEastAfricaTel);

    let contact = getByText('contact@knovvu.com');
    fireEvent.press(contact);

  });

  test('mock version and build number control', async () => {
    store = mockStore(initialState);
    const {getByText} = render(
      <Provider store={store}>
        <About navigation={navi} />
      </Provider>,
    );
    
    expect(getByText('Version : 1.0.1(1)'));

  });
});
