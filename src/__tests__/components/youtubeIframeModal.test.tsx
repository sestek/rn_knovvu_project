import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import YoutubeIframeModal from '../../components/youtubeIframeModal';

describe('components/youtubeIframeModal', () => {
  afterEach(() => {
    cleanup();
  });

  test('rendered for YoutubeIframeModal', async () => {
    const {queryByLabelText, getByTestId} = render(
      <YoutubeIframeModal open={true} setOpen={jest.fn()} />,
    );

    const modal = queryByLabelText('privacy-policy-modal');

    expect(modal?.props).toMatchObject({
      visible: true,
    });

    await waitFor(() => {
      const button = getByTestId('button');
      fireEvent.press(button);
    });

  });
});
