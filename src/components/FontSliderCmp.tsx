import React, {useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Text, Slider} from '@rneui/base';
interface FontSliderCmpProps {
  webchatCustomize: any;
  onChangeCustomize: (key: string, value: string) => void;
}

const FontSliderCmp: React.FC<FontSliderCmpProps> = ({
  webchatCustomize,
  onChangeCustomize,
}) => {
  const [fontSizes, setFontSizes] = useState({
    titleFontSize: 0,
    subtitleFontSize: 0,
    descriptionFontSize: 0,
  });

  useEffect(() => {
    if (webchatCustomize) {
      setFontSizes({
        titleFontSize: webchatCustomize.titleFontSize || 0,
        subtitleFontSize: webchatCustomize.subtitleFontSize || 0,
        descriptionFontSize: webchatCustomize.descriptionFontSize || 0,
      });
    }
  }, [webchatCustomize]);
  const handleFontSizeChange = (key: keyof typeof fontSizes, value: number) => {
    setFontSizes(prevState => ({...prevState, [key]: value}));

    onChangeCustomize(key, value)
  };
  const renderSlider = (key: keyof typeof fontSizes, label: string) => {
    const fontSize = fontSizes[key];

    return (
      <View style={styles.badgeView} key={key}>
        <Text style={styles.text}>{label}</Text>
        <Slider
          style={{flex: 7, marginLeft: 20}}
          value={fontSize}
          onValueChange={value => handleFontSizeChange(key, value)}
          maximumValue={50}
          minimumValue={0}
          minimumTrackTintColor={'#e08dbf'}
          step={1}
          allowTouchTrack
          trackStyle={{
            height: 5,
            backgroundColor: 'transparent',
          }}
          thumbStyle={{height: 5, width: 5, backgroundColor: 'transparent'}}
          thumbProps={{
            children: (
              <View
                style={{
                  backgroundColor: '#EC008C',
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  bottom: 13,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    textAlign: 'center',
                    lineHeight: 30,
                    fontWeight: 'bold',
                  }}>
                  {fontSize}
                </Text>
              </View>
            ),
          }}
        />
      </View>
    );
  };
  return (
    <View>
      {renderSlider('titleFontSize', 'Title Font Size')}
      {renderSlider('subtitleFontSize', 'Subtitle Font Size')}
      {renderSlider('descriptionFontSize', 'Description Font Size')}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
    flex: 3,
  },
  badgeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
});

export default FontSliderCmp;
