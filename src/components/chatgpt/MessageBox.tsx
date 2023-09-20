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
  const renderItemCode = () => {
    return (
      <View style={styles.messageContainerContent}>
        <Markdown styles={styles.rceMboxText}>{value}</Markdown>
      </View>
    );
  };
  const renderItemMessage = () => {
    return (
      <View style={{...styles.messageContainerContent}}>
        <Text style={styles.itemText(position)}>{value}</Text>
        {/* <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.itemText(position)}>{value}</Text>
        </View> */}
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
    width: Dimensions.get('window').width / 1.45,
    alignSelf: position === 'left' ? 'flex-start' : 'flex-end',
  }),
  messageContainerContent: {
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  rceMboxText: {
    fontSize: 16.6,
  },
  itemText: (position: any) => ({
    fontSize: 16,
    fontWeight: position === 'left' ? '400' : '500',
    lineHeight: 19.5,
    color: position === 'left' ? '#373F48' : '#EC008C',
    textAlign: position === 'left' ? 'left' : 'right',
  }),
});

export default MessageBox;
