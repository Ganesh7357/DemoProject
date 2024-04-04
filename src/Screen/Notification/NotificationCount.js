import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet, DeviceEventEmitter} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';
import Helper from '../../lip/Helper';

const NotificationCount = (navigation) => {
  const {
    title,
    leftIcon,
    onClickleftIcon,
    transparent,
    colorText,
    rightIcon,
    onClickrightIcon,
  } = navigation;
  const [count, setcount] = useState(0);

  // useEffect(() => {
  //   getNotificationCount();
  //   const interval = setInterval(() => {
  //     getNotificationCount();
  //   }, 5000);
  //   return () => clearInterval(interval);
   
  // }, []);

  const getNotificationCount = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return;
        } else {
          Helper.makeRequest({
            url: ApiUrl.EmployeeUNReadApi,
          })
            .then(response => {
             
              if (response.success == true) {
                setcount(response?.data?.unreadCount);
              } else {
                setcount(0);
                if (response.message == 'Unauthorized access.') {
                  DeviceEventEmitter.emit("Unauthorized",true)
                 
                }
              }
            })
            .catch(err => {
             
            });
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        hitSlop={{top: 25, bottom: 25, right: 25, left: 25}}
        onPress={() => {
          onClickrightIcon();
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={styles.iconOffCss} source={rightIcon} />
          {count > 0 && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                width: 16,
                height: 16,
                borderRadius: 15 / 2,
                left: 5,
                top: +10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: 8,
                }}>
                {count > 10 ? '10+' : count}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  iconOffCss: {
    // width: 20,
    // height: 20,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red', // Customize the badge background color
    color: 'white', // Customize the badge text color
    borderRadius: 4, // Adjust the borderRadius as needed
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
});

export default NotificationCount;
