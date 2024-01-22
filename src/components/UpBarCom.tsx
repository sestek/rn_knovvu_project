import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ClosePink, Knovvu32, Knovvu32x32, Settings} from '@src/assests';
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
            height:30
          }}>
          <Image
            source={Knovvu32x32}
            style={{width: 32, height: 32, marginHorizontal: 16}}
          />
          <Text style={{color: '#5F6295', fontWeight: '500', paddingTop: 5}}>
            {title}
          </Text>
          {close ? (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                source={ClosePink}
                style={{width: 26, height: 26, marginHorizontal: 16}}
                onProgress={() => {
                  navigation.navigate('Home');
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Image
                source={Settings}
                style={{width: 40, height: 40, marginHorizontal: 16}}
                onProgress={() => {
                  navigation.navigate('Settings');
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{width: '100%', height: 0.2, backgroundColor: 'gray', marginTop:15}}></View>
      </View>

      {children}
    </SafeAreaView>
  );
};
export default UpBarCom;

const styles = StyleSheet.create({});
