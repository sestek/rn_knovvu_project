import React from 'react';
import { Dimensions, View } from 'react-native';
import { BottomSheet } from '@rneui/base';
import YoutubePlayer from 'react-native-youtube-iframe';
const YoutubeIframeModal = ({ open, setOpen }) => {

  return (
    <BottomSheet
      scrollViewProps={{ scrollEnabled: false }}
      modalProps={{ accessibilityLabel: "privacy-policy-modal" }}
      isVisible={open}
      onBackdropPress={() => setOpen()}
    >
      {/*
          TEST ICIN YAPILMISTI FAKAT ANDROID DE GOZUKUYOR GIZLENMESI LAZIM
          <Button testID='button' style={{ display: 'none',backgroundColor:'white' }} onPress={() => setOpen()}></Button>
  */}
      <View style={{ flex: 1, paddingBottom: 20, backgroundColor: '#fff' }} >
        <YoutubePlayer
          width={Dimensions.get('screen').width}
          height={Dimensions.get('screen').height * 0.3}
          play={true}
          videoId={'YVQ6D1CdmC4'}

        />
      </View>
    </BottomSheet>
  );
};

export default YoutubeIframeModal;
