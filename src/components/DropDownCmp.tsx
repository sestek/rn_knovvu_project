import React, {useState} from 'react';
import {Card} from '@rneui/base';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {
  ChatBotActive,
  ChatbotWhite,
  AvatarActive,
  AvatarWhite,
} from '@src/assests';

interface DropdownProps {
  isVisible: boolean;
  onClose: () => void;
  items: string[];
  onDone: (selectedItem: string | null) => void; 
}

const DropDownCmp: React.FC<DropdownProps> = ({
  isVisible,
  onClose,
  items,
  onDone,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const renderItem = (item: string, index: number) => {
    const isSelected = selectedItem === item;
    return (
      <TouchableOpacity
        key={index.key}
        style={[
          styles.itemContainer,
          {
            backgroundColor: isSelected ? '#EB1685' : '#F2F2F2',
            borderRadius: 10,
            marginHorizontal: 13,
            marginVertical: 6,
          },
        ]}
        onPress={() => onSelectItem(item)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={[styles.itemText, {color: isSelected ? 'white' : 'black'}]}>
            {item.key}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            { item.value?.isMicEnabled !== false ? <Image
              source={ isSelected ? ChatbotWhite:ChatBotActive}
              style={{width: 25, height: 25, marginHorizontal: 5}}
            /> : null}
            {
              item.value?.personaId !== "" ? <Image
              source={isSelected ? AvatarWhite : AvatarActive}
              style={{width: 25, height: 25, marginHorizontal: 5}}
            /> : null
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onSelectItem = (selectedItem: string) => {
    setSelectedItem(selectedItem);
    // onClose();
  };
  const handleDone = () => {
    onDone(selectedItem); 
    onClose();
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.topButton}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDone}>
            <Text style={styles.centerText}>Project Name</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDone}>
            <Text style={styles.topButton}>Done</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {items.map((item, index) => renderItem(item, index))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingBottom:0
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height:60,
  },
  topButton: {
    color: '#EB1685',
    fontSize: 16,
  },
  centerText: {
    color: 'black',
    fontSize: 16,
  },
  scrollView: {
    maxHeight: '50%', 
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DropDownCmp;
