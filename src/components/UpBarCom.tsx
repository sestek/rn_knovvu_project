import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Close, ClosePink, Knovvu32, Knovvu32x32, Settings} from '@src/assests';
import {SafeAreaView} from 'react-native-safe-area-context';

const UpBarCom = ({navigation, children, title, close}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            height:40,
            borderBottomWidth:0.5,
            borderBottomColor:"#5F6295",
            alignItems:"center"
          }}>
          <Image
            source={Knovvu32x32}
            style={{width: 25, height: 25, marginHorizontal: 16}}
          />
          <Text style={{color: '#5F6295', fontWeight: '500', textAlign: 'center', paddingTop:10}}>
            {title}
          </Text>
          {close ? (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                source={Close}
                style={{width: 25, height: 25, marginHorizontal: 16}}
                onProgress={() => {
                  navigation.navigate('Home');
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Image
                source={Settings}
                style={{width: 25, height: 25, marginHorizontal: 16}}
                onProgress={() => {
                  navigation.navigate('Settings');
                }}
              />
            </TouchableOpacity>
          )}
        </View>

      </View>

      {children}
    </SafeAreaView>
  );
};
export default UpBarCom;

const styles = StyleSheet.create({});
