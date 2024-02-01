//import liraries
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
  Linking
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import Helper from '../../Lip/Helper';
import Geolocation from '@react-native-community/geolocation';
import CameraController from '../../Lip/CameraController';
import Colors from '../../component/Colors';
import ImagePath1 from '../../Lip/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../component/Fonts';
import { FontSize } from '../../component/Fonts';
const PunchinScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [punchInStatus, setpunchInStatus] = useState(false);
  const [punchOutStatus, setpunchOutStatus] = useState(false);

  const [punchInTime, setpunchInTime] = useState(null);
  const [punchOutTime, setpunchOutTime] = useState(null);

  const [lat, setlat] = useState('');
  const [long, setlong] = useState('');
  const [hed, sethed] = useState('')

  const [employeeCode, setemployeeCode] = useState('')

  const [ImagePathName, setimagePathName] = useState('')
  const [ImageFormat, setimageFormat] = useState('')
  const [ImagePath, setimagePath] = useState('')

  useEffect(() => {
    console.log(ImagePathName, 'ImagePathName')
    Helper.getData('userdata').then(res => {
      getAttendanceStatus(res._id);
    });
    try {
      Geolocation.getCurrentPosition(pos => {
        const crd = pos.coords;
        const { latitude, longitude, heading } = crd;
        console.log("crd", crd)
        setlat(latitude);
        setlong(longitude);
        sethed(heading);
      });
    } catch (error) {
      console.log('error_live22', error);
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      checkLocationPermission();
    }, 1000);
    return () => clearInterval(interval);

  }, []);
  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const getAttendanceStatus = async id => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast('INTERNET_CONNECTION');
          return;
        } else {
          Helper.makeRequest({
            url: 'Employees/checkDayAttendance/' + id,
            method: 'GET',
          })
            .then(response => {
              if (response.success == true) {
                setpunchInStatus(response?.data?.checkTodayAtt?.punchIn);
                setpunchOutStatus(response?.data?.checkTodayAtt?.punchOut);
                setpunchInTime(response?.data?.checkTodayAtt?.punchInTime);
                setpunchOutTime(response?.data?.checkTodayAtt?.punchOutTime);
              } else {
                setpunchInStatus(false);
                setpunchOutStatus(true);
                setpunchInTime('');
                setpunchOutTime('');
                Helper.showToast(response.message)
                if (response.message == 'Unauthorized access.') {
                  Helper.removeItemValue('userdata');
                  Helper.removeItemValue('token');
                  Helper.removeItemValue('role');

                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                  });
                }
              }
            })
            .catch(err => {
              console.log(err, '==============errrr123')
            });
        }
      });
    } catch (error) { }
  };

  const btnPunchIn = async () => {
    try {
      if (employeeCode === '') {
        Helper.showToast('Enter employee Code');
        return;
      }
      if (ImagePathName === '') {
        let res = await btnPress();
        if (res && res.path) {
          var parts = res?.path?.split('/');
          var imageName = parts[parts.length - 1];
          // setimagePathName(imageName)
          if (imageName) {
            await EmployeesPunchIn();
          }
        }
      }
      if (ImagePathName) {
        await EmployeesPunchIn();
      }
    } catch (error) {
      // Handle errors if necessary
    }
  };

  const EmployeesPunchIn = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast('INTERNET_CONNECTION');
          return;
        } else {
          var data = {
            punchIn: true,
            lat: lat,
            long: long,
            employeeCode: employeeCode,
            ImagePathName: ImagePathName,
          };
          Helper.makeRequest({
            url: 'Employees/attendance',
            method: 'POST',
            data: data,
          })
            .then(response => {
              if (response.success == true) {
                Helper.getData('userdata').then(res => {
                  getAttendanceStatus(res._id);
                });

                var DB = response.data

                console.log(DB, '-------------response-----------')
              } else {
                Helper.showToast(response.message);
              }
            })
            .catch(err => {
              console.log(err, '============errrrr=========')
            });
        }
      });
    } catch (err) { }
  }

  const btnPunchOut = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast('INTERNET_CONNECTION');
          return;
        } else {
          var data = {
            punchOut: true,
            lat: lat,
            long: long,
          };

          Helper.makeRequest({
            url: 'Employees/attendance',
            method: 'POST',
            data: data,
          })
            .then(response => {
              if (response.success == true) {
                Helper.getData('userdata').then(res => {
                  getAttendanceStatus(res._id);
                });
                console.log(response, '-------------response-----------')
              } else {
                Helper.showToast(response.message);
              }
            })
            .catch(err => {
              console.log(err, '======errr=========113')
            });
        }
      });
    } catch (error) { }
  };

  const showpunchTime = st => {
    if (st) {
      const input = st.toString();

      // Extract hours, minutes, and seconds from the input
      const hours = input.slice(0, 2);
      const minutes = input.slice(2, 4);
      const seconds = input.slice(4, 6);

      // Format the time as hh:mm:ss
      const hhmmss = `${hours}:${minutes}:${seconds}`;

      return hhmmss;
    }
  };

  const btnPress = async () => {
    try {
      const res = await new Promise((resolve, reject) => {
        CameraController.open(response => {
          resolve(response);
        });
      });

      if (res?.path) {
        var parts = res?.path?.split('/');
        var imageName = parts[parts.length - 1];
        setimagePathName(imageName);
        setimageFormat(res?.mime);
        setimagePath(res?.path);
      }
      return res;
    } catch (error) {
      console.log(error, '==========error=====');
    }
  };

  const checkLocationPermission = async () => {
    try {
      const permissionName =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      const status = await check(permissionName);
      console.log('status++++++', status);
      if (
        status === RESULTS.DENIED ||
        status === RESULTS.BLOCKED ||
        status === RESULTS.UNAVAILABLE
      ) {
        setModalVisible(true);
      } else if (status === RESULTS.GRANTED) {
        checkLocationService();
      }
    } catch (error) {
      setModalVisible(true);
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
      console.log('status_____', status);
      if (
        status === RESULTS.DENIED ||
        status === RESULTS.BLOCKED ||
        status === RESULTS.UNAVAILABLE
      ) {
        setModalVisible(true);
      } else if (status === RESULTS.GRANTED) {
        checkLocationService();
      }
    } catch (error) {
      setModalVisible(true);
      console.error('Error requesting location permission:', error);
    }
  };

  const checkLocationService = () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          // Do something with the location data
          console.log('Current location:', position);
          setModalVisible(false);
        },
        error => {
          console.log('Error getting location:', error);

          if (error.code === 2 || error.code === 3) {
            setModalVisible(false);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    } catch (error) {
      // This block will not be reached, as getCurrentPosition is asynchronous
      console.error('Error occurred:', error);
    }
  };
  const locationUpdateModel = () => {
    return (
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
              <Image source={ImagePath1.Location_ic}></Image>

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
    );
  };
  return (
    <View style={styles.container}>
      <Text style={{
        color: '#333',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        padding: 5,
        top: 20,
        // marginVertical:20,
      }}>E m p l o y e e s    A t t e n d a n c e</Text>
      <View style={styles.mainSpace}>
        <View style={styles.maincontainer}>
          <View style={{
            backgroundColor: '#333',
            borderRadius: 10,
          }}>
            <TextInput
              onChangeText={text => {
                setemployeeCode(text);
              }}
              placeholderTextColor={'#fff'}
              value={employeeCode}
              style={styles.textInput}
              placeholder='Enter employee code' />
          </View>
          <Text style={{ paddingHorizontal: 10, color: '#fff' }}>{ImageFormat}</Text>
          <TouchableOpacity
            disabled={punchInStatus}
            onPress={() => {
              btnPunchIn();
            }}
            style={punchInStatus ? styles.btnGray : styles.btnStyle}>
            <Text style={styles.btnText}>
              Punch in
            </Text>
          </TouchableOpacity>

          <Text style={styles.btnBlack}>
            Punch in Time :{' '}
            <Text style={styles.btnBlue}>
              {punchInTime == null ? '-' : showpunchTime(punchInTime)}
            </Text>
          </Text>

          <TouchableOpacity
            onPress={() => {
              btnPunchOut();
            }}
            disabled={punchOutStatus}
            style={punchOutStatus ? styles.btnGray : styles.btnStyle}>
            <Text style={styles.btnText}>
              Punch out
            </Text>
          </TouchableOpacity>
          <Text style={styles.btnBlack}>
            Punch out Time :{' '}
            <Text style={styles.btnBlue}>
              {punchOutTime == null ? '-' : showpunchTime(punchOutTime)}
            </Text>
          </Text>
        </View>
      </View>
      {locationUpdateModel()}
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#444',
    justifyContent: 'center',
  },
  maincontainer: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: '100%'
  },
  mainSpace: {
    marginVertical: hp(2),
    marginHorizontal: wp(3),
    justifyContent: 'center',
    flex: 1,
  },
  btnStyle: {
    backgroundColor: '#FFB546',
    marginVertical: hp(2),
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  btnGray: {
    backgroundColor: '#ccc',
    marginVertical: hp(2),
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#333',
    fontWeight: '700'
  },
  btnWhite: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'White',
  },
  btnBlue: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#aaa',
  },
  btnBlack: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    fontSize: 13,
    height: 45,
    color: '#fff',
    fontWeight: '700',
    margin: 10,
    width: '50%',
    marginHorizontal: 20,
    alignSelf: 'center',
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

export default PunchinScreen;
