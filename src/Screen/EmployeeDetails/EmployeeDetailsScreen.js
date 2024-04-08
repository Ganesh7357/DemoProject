import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../component/AppHeader';
import Colors from '../../lip/Colors';
import ImagePath from '../../lip/ImagePath';

import EmployeeTopTabScreen from './EmployeeTopTabScreen';

const EmployeeDetailsScreen = ({navigation, route}) => {

  return (
    <View style={styles.container}>
      <AppHeader
        leftIcon={ImagePath.Ic_back}
        onClickleftIcon={() => {
          navigation.goBack();
        }}
        title={route?.params?.name}
        rightIcon={ImagePath.Ic_notification}
        onClickrightIcon={() => {
          navigation.navigate('NotificationScreen');
        }}
      />
       <EmployeeTopTabScreen  navigation={navigation}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
})
export default EmployeeDetailsScreen;
