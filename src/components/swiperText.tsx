import React, { useEffect, useState } from 'react';
import {
  StyleSheet
} from 'react-native';
import { Text} from "@rneui/base";
import YoutubePlayer from "react-native-youtube-iframe";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppSelector } from "@src/utils/redux/hooks";

type SwiperProps = {
    texts: string[];
};

const SwiperText: React.FC<SwiperProps> =({texts}) => {

    const color_200 = useAppSelector(state => state.theme.color_200);

    const [text, setText] = useState<string>(texts[0]);
    const [textInterval, setTextInterval] = useState<null | number>(null);

    useEffect(() => {
        console.log(textInterval)
        if (textInterval) {
            clearInterval(textInterval);
            setTextInterval(null);
        }
        setTextInterval(setInterval(() => changeText(), 1000));
    }, [text]);

    const changeText = () => {
        const findIndex = texts.findIndex(textData => textData === text);
        setText(findIndex !== 4 ? texts[findIndex + 1] : texts[0]);
    }

    return (
        <Text h4 style={{ ...styles.text, color: color_200 }}>{text}</Text>
    )
};

const styles = StyleSheet.create({
    text: {
        fontWeight: '700',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 28,
    },
})

export default SwiperText;
