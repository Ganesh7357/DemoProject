// AttendanceScreen.js
import React, { useState, useEffect } from 'react';
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
import Colors from '../../component/Colors';
import ImagePath from '../../Lip/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../component/Fonts';
import { FontSize } from '../../component/Fonts';
const AttendanceScreen = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);


  useEffect(() => {
    // locationUpdateModel()
    // checkLocationPermission();
    const interval = setInterval(() => {
      // checkLocationPermission();
    }, 1000);
    return () => clearInterval(interval);

  }, []);

  const checkLocationPermission = async () => {
    try {
      const permissionName = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      const status = await check(permissionName);
      console.log(status, 'status')
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

  const locationUpdateModel = () => {
    return (
      <View style={styles.container2}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
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
    )
  }







  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const handlePunch = () => {
    if (isPunchedIn) {
      // Punch-out
      setEndTime(new Date());
    } else {
      // Punch-in
      setStartTime(new Date());
    }
    setIsPunchedIn(!isPunchedIn);
  };
  const handleUntick = () => {
    // Reset punch-in/punch-out status and clear start/end times
    setIsPunchedIn(false);
    setStartTime(null);
    setEndTime(null);
  };
  const formatTime = (time) => {
    return time ? time.toLocaleTimeString() : 'Not punched';
  };
  const getStatusColor = () => {
    return isPunchedIn ? '#e74c3c' : '#2ecc71';
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.untickButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.untickButtonText}>OpenModel</Text>
      </TouchableOpacity>

      <Image
        source={ImagePath.eye_open} // Replace with your image path
        style={styles.logo}
      />
      <Text style={styles.title}>Attendance System</Text>
      <Text style={styles.status}>
        Status: {isPunchedIn ? 'Punched In' : 'Punched Out'}
      </Text>
      <Text style={styles.time}>{currentTime.toLocaleTimeString()}</Text>
      <Text>Start Time: {formatTime(startTime)}</Text>
      <Text>End Time: {formatTime(endTime)}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: getStatusColor() }]}
        onPress={handlePunch}
      >
        <Text style={styles.buttonText}>
          {isPunchedIn ? 'Punch Out' : 'Punch In'}
        </Text>
      </TouchableOpacity>
      {isPunchedIn && (
        <TouchableOpacity style={styles.untickButton} onPress={handleUntick}>
          <Text style={styles.untickButtonText}>Untick</Text>
        </TouchableOpacity>
      )}
      {locationUpdateModel()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  time: {
    fontSize: 20,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  untickButton: {
    marginTop: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  untickButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  container2: {
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

export default AttendanceScreen;
