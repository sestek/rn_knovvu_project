import React from 'react';
import {Dimensions, View} from 'react-native';
import {BottomSheet, Button, Text} from '@rneui/base';
import YoutubePlayer from 'react-native-youtube-iframe';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const YoutubeIframeModal = ({open, setOpen}) => {
  
  return (
      <BottomSheet
        scrollViewProps={{scrollEnabled: false}}
        modalProps={{accessibilityLabel:"privacy-policy-modal"}}
        isVisible={open}   
        onBackdropPress={() => setOpen()}
        >
          <Button testID='button' style={{display: 'none'}} onPress={()=> setOpen()}>hshs</Button>
        <View style={{flex: 1, paddingBottom: 20, backgroundColor: '#fff'}} >
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
