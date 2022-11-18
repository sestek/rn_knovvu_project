import React from 'react'
import { cleanup, render, screen } from '@testing-library/react-native'
import ColorPickerModal from '../../components/colorPickerModal';

describe('components/colorPickerModal', () => {
    beforeAll(() => {
    });

    afterAll(() => {
    });

    afterEach(() => {
        cleanup();
    });

    test('rendered for colorpickermodal', async () => {
        const { getByText, toJSON } = render(<ColorPickerModal isVisible={false} setIsVisible={function (value: React.SetStateAction<boolean>): void {
            throw new Error('Function not implemented.');
        }} color={''} headerText={'Tayfun'} saveColor={function (color: string): void {
            throw new Error('Function not implemented.');
        }} />);

        //expect(getByText('Tayfun')).toBeDefined()
        expect(toJSON()).toMatchSnapshot()
    });
});