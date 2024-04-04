import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../value/Colors';
import Fonts from '../value/Fonts';

function TextInputView(navigation) {
  const {
    editable,
    onBlur,
    placeholder,
    value,
    returnKeyType,
    onChangeText,
    getfocus,
    rightIconi,
    onClickRightIconi,
    keyboardType,
    secureTextEntry,
    setfocus,
    maxLength,
    numberOfLines,
    height,
    multiline,
    rightIcon,
    onClickRightIcon,
    backgroundColor,
    marginHorizontal,
    fontSize,
    placeholderTextColor,
    top,
    color,
    borderBottomColor,
    fontFamily,
    autoFocus,
  } = navigation;
  return (
    <View
      style={[
        styles.mainViewOffCss,
        {
          height: height ? height : hp('7%'),
          borderBottomColor: borderBottomColor
            ? borderBottomColor
            : Colors.Mercury,
        },
      ]}
      backgroundColor={backgroundColor}
      marginHorizontal={marginHorizontal}>
      <TextInput
        style={[
          styles.textValue,
          {
            height: height ? height : hp('7%'),
            fontFamily: fontFamily ? fontFamily : Fonts.RobotoMedium,
          },
        ]}
        placeholderStyle={[
          styles.textValue,
          {
            height: height ? height : hp('7%'),
            fontFamily: fontFamily ? fontFamily : Fonts.RobotoMedium,
          },
        ]}
        placeholder={placeholder}
        fontSize={fontSize}
        top={top}
        value={value}
        autoFocus={autoFocus}
        autoCapitalize="none"
        color={color}
        placeholderTextColor={placeholderTextColor}
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        onSubmitEditing={getfocus}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        ref={setfocus}
        blurOnSubmit={false}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={multiline}
        editable={editable}
        onBlur={onBlur}
      />
      {rightIcon && (
        <TouchableOpacity
          //hitSlop={CommonStyles.hitSlop}
          onPress={() => {
            onClickRightIcon();
          }}>
          <Image source={rightIcon} style={styles.rightIconCss} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewOffCss: {
    borderBottomColor: Colors.Black,
    borderBottomWidth: 1,
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textValue: {
    color: Colors.White,
    fontSize: hp('1.9%'),
    flex: 1,
    paddingBottom: 0,
  },
  rightIconCss: {
    height: hp(6),
    width: wp(6),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  rightIconCss1: {
    height: hp(4),
    width: wp(4),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    tintColor: '#4588fe',
  },
});

export default TextInputView;
