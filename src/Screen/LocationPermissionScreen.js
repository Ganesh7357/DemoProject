// LocationPermissionScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../component/Colors';
import ImagePath from '../Lip/ImagePath';
import Caption from '../component/Caption';
import Fonts from '../component/Fonts';
import { FontSize } from '../component/Fonts';

const LocationPermissionScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);


  useEffect(() => {
    checkLocationPermission();
    const interval = setInterval(() => {
      checkLocationPermission();
    }, 1000);
    return () => clearInterval(interval);

  }, []);

  const checkLocationPermission = async () => {
    try {
      const permissionName = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      const status = await check(permissionName);

      setPermissionStatus(status);

      if (status === RESULTS.DENIED || status === RESULTS.BLOCKED || status === RESULTS.UNAVAILABLE) {
        setModalVisible(true);
      } else if (status === RESULTS.GRANTED) {
        checkLocationService();
      }
    } catch (error) {
      setModalVisible(true)
      console.error('Error checking location permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const permissionName =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      const status = await request(permissionName);
      setPermissionStatus(status);
      console.log('status', status)
      if (status === RESULTS.DENIED || status === RESULTS.BLOCKED || status === RESULTS.UNAVAILABLE) {
        setModalVisible(false);
      } else if (status === RESULTS.GRANTED) {
        checkLocationService();
      }
    } catch (error) {
      setModalVisible(true);
      console.error('Error requesting location permission:', error);
    }
  };

  const checkLocationService = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // Do something with the location data
        console.log('Current location:', position);
        setModalVisible(false)
      },
      (error) => {
        if (error.code === 2) {
          setModalVisible(true)
        } else if (error.code === 3) {
          setModalVisible(true)
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const openSettings = () => {
    // Implement code to open app settings
    openSettings().catch(() => {
      console.warn('cannot open settings');
    });
  };



  return (
    <View style={styles.container}>
      {/* <Image
        source={ImagePath.Ic_splash}
        style={{
          height: hp(100),
          width: wp(100),
        }}
      /> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalMainView}>
          <View
            style={[
              styles.modalSubView,
              {
                paddingHorizontal: wp(0),
                marginHorizontal: wp(6),
              },
            ]}>
            <View
              style={{
                marginVertical: hp(2),
                alignItems: 'center',
              }}>
              <Image source={ImagePath.Location_ic}></Image>

              <Caption
                text={'Location Permission Required'}
                style={{
                  color: Colors.BlackColor,
                  fontSize: FontSize.fontSize18,
                  fontFamily: Fonts.RobotoMedium,
                  textAlign: 'center',
                  marginVertical: hp(2),
                }}
              />

              <Caption
                text={'Please enable location services for the app.'}
                style={{
                  color: Colors.BlackColor,
                  fontSize: FontSize.fontSize16,
                  fontFamily: Fonts.RobotoMedium,
                  textAlign: 'center',
                  width: wp(60),
                  marginVertical: hp(3),
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  requestLocationPermission();
                }}
                activeOpacity={0.5}
                style={{
                  backgroundColor: '#0076FF',

                  borderRadius: 20,
                  marginHorizontal: 2,
                  padding: hp(1.5),
                  width: wp(60),
                }}>
                <Caption
                  text={'Allow'}
                  style={{
                    color: Colors.White,
                    fontSize: FontSize.fontSize16,
                    fontFamily: Fonts.RobotoMedium,
                    textAlign: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
  },
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalSubView: {
    backgroundColor: Colors.White,
    marginHorizontal: wp(6),
    borderRadius: 10,
    paddingBottom: hp(3),
    paddingHorizontal: wp(5),
    paddingTop: hp(1.5),
  },
});

export default LocationPermissionScreen;
