import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImagePath from '../value/ImagePath';
import Caption from './Caption';
import Colors from '../value/Colors';
import Fonts from '../value/Fonts';
import {FontSize} from '../value/Fonts';

const FAB = props => {
  const [showbtn, setshowbtn] = useState(false);

 
  return (
    <View style={styles.container}>
      {showbtn && (
        <>
          <TouchableOpacity
             activeOpacity={0.9}
            onPress={props?.importonPress}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            {/* <Caption text={"IMPORT LEAD"} style={styles.headingText} /> */}
            <Image
              source={ImagePath.Ic_youtube}
              style={styles.imgStyle}></Image>
          </TouchableOpacity>

          <TouchableOpacity
           activeOpacity={0.9}
            onPress={props?.quickleadonPress}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            {/* <Caption text={"QUICK LEAD"} style={styles.headingText} /> */}
            <Image
              source={ImagePath.Ic_uploaddocuments}
              style={styles.imgStyle}></Image>
          </TouchableOpacity>

          <TouchableOpacity
           activeOpacity={0.9}
            onPress={props?.addleadonPress}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            {/* <Caption text={"ADD LEAD"} style={styles.headingText} /> */}
            <Image
              source={ImagePath.Ic_uploadImage}
              style={styles.imgStyle}></Image>
          </TouchableOpacity>
        </>
      )}

      {showbtn ? (
        <TouchableOpacity
        activeOpacity={0.9}
          onPress={() => {
            setshowbtn(false);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Image
            source={ImagePath.Ic_crossIcon}
            style={styles.imgStyle}></Image>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
        activeOpacity={0.9}
          onPress={() => {
            setshowbtn(true);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Image source={ImagePath.Ic_addlead} style={styles.imgStyle}></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    flex: 1,
    borderRadius: 5,
  },
  headingText: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize18,
    fontFamily: Fonts.RobotoMedium,
    right: 10,
  },
  imgStyle: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
});
