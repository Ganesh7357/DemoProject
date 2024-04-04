import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Colors from '../value/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../value/Fonts';
import {FontSize} from '../value/Fonts';


function AppNotificationHeader(navigation) {
  const {title, leftIcon, onClickleftIcon, transparent, colorText, rightIcon, onClickrightIcon} = navigation;
  return (
    <View
      style={[
        styles.headerViewOffCss,
        {backgroundColor: transparent ? transparent : Colors.ThemeColor},
      ]}>
      {leftIcon && (
        <TouchableOpacity
          activeOpacity={0.9}
          hitSlop={{top: 25, bottom: 25, right: 25, left: 25}}
          onPress={() => {
            onClickleftIcon();
          }}>
          <Image style={styles.iconOffCss} source={leftIcon} />
        </TouchableOpacity>
      )}

      {title && (
        <View >
          <Text
            style={{
              color: colorText ? colorText : Colors.White,
              fontSize: FontSize.fontSize14,
              textAlign: 'center',
              fontFamily: Fonts.PoppinsSemiBold,
              left:10
            }}>
            {title}
          </Text>
        </View>
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  headerViewOffCss: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: wp(3),
    height: 56,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
   // justifyContent:'space-between'
  },
  iconOffCss: {
    // width: 20,
    // height: 20,
   resizeMode: 'contain',
   
  },
});

export default AppNotificationHeader;