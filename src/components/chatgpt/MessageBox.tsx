import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {Input, Text} from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card} from '@rneui/base';
import Markdown from '../markdown';

interface MessageItem {
  value: string;
  position: string;
  type: string;
}

const MessageBox: React.FC<MessageItem> = ({value, position, type}) => {
  const renderItemMessage = () => {
    return (
      <View style={styles.messageContainerContent}>
        <Markdown styles={styles.rceMboxText}>{value}</Markdown>
      </View>
    );
  };

  return (
    <View style={styles.messageContainer(position)}>
      {type === 'message' && renderItemMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: (position: any) => ({
    width: Dimensions.get('window').width / 1.3,
    alignSelf: position === 'left' ? 'flex-start' : 'flex-end',
  }),
  messageContainerContent: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
  },
  rceMboxText: {
    fontSize: 13.6,
  },
});

export default MessageBox;
