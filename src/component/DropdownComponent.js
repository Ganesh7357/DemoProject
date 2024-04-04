import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Dropdown } from 'react-native-searchable-dropdown-kj';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../lip/Colors';
import Fonts from '../lip/Fonts';
import { FontSize } from '../lip/Fonts';
import ImagePath from '../lip/ImagePath';

function DropdownComponent(navigation) {
  const { data, value, placeholder, onClickrightIcon, style, viewPosition } = navigation;
  return (
    <Dropdown
      style={style}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      // maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder ? placeholder : "Select item"}
      searchPlaceholder="Search..."
      value={value}
      dropdownPosition={viewPosition}
      onChange={item => {
        onClickrightIcon(item.value);
      }}
      keyboardAvoiding={false}
      inside={true}
      renderRightIcon={() => (
        <Image
          source={ImagePath.Ic_upicon}
          style={{
            resizeMode: 'contain',
            right: 2
          }}></Image>
      )}
    />
  );
}

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {


  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: FontSize.fontSize13,
    color: Colors.BlackColor,
  },
  selectedTextStyle: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: FontSize.fontSize13,
    color: Colors.BlackColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontFamily: Fonts.RobotoMedium,
    fontSize: FontSize.fontSize13,
    color: Colors.BlackColor,
    borderRadius: 5,
    borderColor: Colors.Gray,
    // borderWidth: 1,
    paddingHorizontal: 7,
  },
});
