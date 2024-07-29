import React, {useState} from 'react';
import {View, Text, Pressable, Image, StyleProp, ViewStyle} from 'react-native';
import {ArrowDown, ArrowUp} from '@src/assests';

interface CollapseViewProps {
  header: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CollapseView: React.FC<CollapseViewProps> = ({
  header,
  children,
  style,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={[styles.collapseContainer, style]}>
      <Pressable onPress={() => setCollapsed(!collapsed)}>
        <Text style={[styles.collapseHeader]}>{header}</Text>
        <Image
          source={collapsed ? ArrowDown : ArrowUp}
          style={[styles.icon]}
        />
      </Pressable>
      {!collapsed && <View>{children}</View>}
    </View>
  );
};

const styles = {
  collapseContainer: {
    marginBottom: 8,
  },
  collapseHeader: {
    fontSize: 16,
    fontWeight: '400',
    padding: 8,
    paddingRight: 32, 
  },
  icon: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [{translateY: -12}], 
    width: 16,
    height: 16,
  },

};

export default CollapseView;
