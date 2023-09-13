import {Button, Card, Text} from '@rneui/base';
import {useAppSelector} from '@src/utils/redux/hooks';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Mic} from '@src/assests';

const ChatGpt = ({navigation}) => {
  useEffect(() => {
    const socket = new WebSocket('wss://ws.bitstamp.net');
    const apiCall = {
      event: 'bts:subscribe',
      data: {channel: 'order_book_btcusd'},
    };
    socket.onopen = (event: any) => {
      //socket.send(JSON.stringify(apiCall));
      console.log('open');
    };
    socket.onmessage = e => {
      console.log('WebSocket mesajı alındı:', e.data);
    };
    socket.onclose = e => {
      console.log('WebSocket bağlantısı kapatıldı:', e.reason);
    };
    socket.onerror = e => {
      console.error('WebSocket hatası:', e.message);
    };
    return () => {
      socket.close();
    };
  }, []);
  return (
    <View style={styles.main}>
      <ScrollView style={styles.scroll}>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              exercitationem repellendus officiis! Quod, reprehenderit!
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              sint quo. Facere, alias possimus.
            </Text>
          </Card>
        </View>
        <View style={{marginBottom:10}}>
          <Card containerStyle={{borderRadius: 8}}>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Cupiditate, quod consectetur voluptatem praesentium asperiores
              tenetur dolorum beatae quae nobis molestiae fugiat sequi officiis
              nostrum tempora reprehenderit assumenda ipsum. Officiis laboriosam
              repudiandae laudantium perferendis voluptatem eos, maiores aliquam
              ipsum neque deleniti odit alias impedit possimus perspiciatis fuga
              doloremque natus. Excepturi, cupiditate?
            </Text>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.recorder}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={Mic} resizeMode="stretch" style={styles.mic} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    position: 'relative',
  },
  recorder: {
    alignItems: 'center',
    padding: 8,
  },
  mic: {
    width: Dimensions.get('screen').width * 0.11,
    height: Dimensions.get('screen').width * 0.11,
  },
});

export default ChatGpt;
