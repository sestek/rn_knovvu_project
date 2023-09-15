import React, {useState} from 'react';
import {View} from 'react-native';
import {Input} from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MessageBox from './MessageBox';

interface MessageProps {
  messages: any;
}

const MessageBoxBody: React.FC<MessageProps> = ({messages}) => {
  return (
    <View style={{}}>
      {messages.map((message: any, index: number) => (
        <MessageBox
          value={message.value}
          position={message.position}
          key={index}
          type={message.type}
        />
      ))}
    </View>
  );
};

export default MessageBoxBody;
