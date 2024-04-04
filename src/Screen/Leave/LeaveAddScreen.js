import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import AppHeader from '../../component/AppHeader';
import Colors from '../../lip/Colors';
import ImagePath from '../../lip/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../lip/Fonts';
import {FontSize} from '../../lip/Fonts';
import RNPickerSelect from 'react-native-picker-select';
// import AppContext from '../../lip/AppContext';
import moment from 'moment';

import Helper from '../../lip/Helper';
import NetInfo from '@react-native-community/netinfo';
// import AlertMsg from '../../lip/AlertMsg';
// import ApiUrl from '../../lip/ApiUrl';
import DatePicker from 'react-native-date-picker';

const LeaveAddScreen = ({navigation}) => {
  // const //loaderContext = useContext(AppContext);

  const [offDataType, setoffDataType] = useState([]);
  const [offData, setoffData] = useState('');

  const [LeaveDataType, setLeaveDataType] = useState([]);
  const [LeaveData, setLeaveData] = useState('');

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const [reasonData, setreasonData] = useState('');
  const [currentUserID, setcurrentUserID] = useState('');

  useEffect(() => {
    getDetails();
    Helper.getData('userdata').then(res => {
      setcurrentUserID(res._id);
    });
  }, []);

  const getDetails = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast('INTERNET_CONNECTION');
          return;
        } else {
          //loaderContext.showLoader();
          Helper.makeRequest({url: 'Employees/leaveTypeDropdown', method: 'GET'})
            .then(response => {
              if (response.success == true) {
                var remarks = response?.data?.remark;
                var types = response?.data?.type;

                let _splist = remarks.map((item, index) => ({
                  label: item,
                  value: item,
                }));

                let _sptypes = types.map((item, index) => ({
                  label: item,
                  value: item,
                }));

                setoffDataType(_splist);
                setLeaveDataType(_sptypes);
                //loaderContext.hideLoader();
              } else {
                //loaderContext.hideLoader();
              }
            })
            .catch(err => {
              //loaderContext.hideLoader();
            });
        }
      });
    } catch (error) {}
  };

  const btnApplyApi = async () => {
    if (offData == 'Leave Type') {
      Helper.showToast('Select Leave type');
    } else if (startDate == null) {
      Helper.showToast('Select Start Date');
    } else if (endDate == null) {
      Helper.showToast('Select End Date');
    } else if (LeaveData == 'Leave Type') {
      Helper.showToast('Select Leave type');
    } else {
      try {
        NetInfo.fetch().then(state => {
          if (!state.isConnected) {
            Helper.showToast('INTERNET_CONNECTION');
            return;
          } else {
            var data = {
              empId: currentUserID,
              remark: offData,
              type: LeaveData,
              startDate: moment(startDate).format('YYYY-MM-DD'),
              endDate: moment(endDate).format('YYYY-MM-DD'),
              description: reasonData,
            };

            //loaderContext.showLoader();
            Helper.makeRequest({
              url: 'Employees/leaveRequest',
              method: 'POST',
              data: data,
            })
              .then(response => {
                if (response.success == true) {
                  DeviceEventEmitter.emit('LeaveScreenupdate', true);
                  navigation.goBack();
                  Helper.showToast(response.message);
                  //loaderContext.hideLoader();
                } else {
                  Helper.showToast(response.message);
                  //loaderContext.hideLoader();
                }
              })
              .catch(err => {
                //loaderContext.hideLoader();
              });
          }
        });
      } catch (error) {
        //loaderContext.hideLoader();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <AppHeader
        leftIcon={ImagePath.Ic_back}
        onClickleftIcon={() => {
          navigation.goBack();
        }}
        title={'Apply Leave'}
        rightIcon={ImagePath.Ic_notification}
        onClickrightIcon={() => {
          navigation.navigate('NotificationScreen');
        }}
      /> */}
      <View style={styles.mainSpace}>
        <View
          style={[
            styles.textInput,
            {
              paddingHorizontal: 0,
            },
          ]}>
          <RNPickerSelect
            onValueChange={value => {
              if (value !== offData) {
                setoffData(value);
              }
            }}
            placeholder={{
              label: 'Leave Type',
              value: 'Leave Type',
            }}
            placeholderTextColor={Colors.textPlaceHolder}
            items={offDataType}
            style={pickerStyle}
            value={offData}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <Image
                  source={ImagePath.Ic_upicon}
                  style={{
                    resizeMode: 'contain',
                  }}></Image>
              );
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            top: 5,
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setOpenStart(true);
            }}
            style={{
              flex: 1,
              flexDirection: 'row',

              backgroundColor: Colors.DrawerColor,
              marginHorizontal: 2,
              borderRadius: 5,

              justifyContent: 'space-around',
              height: 45,
              alignItems: 'center',
            }}>
            <Caption
              text={
                startDate == null
                  ? 'Start Date'
                  : moment(startDate).format('DD/MM/YYYY')
              }
              style={{
                color: Colors.BlackColor,
                fontFamily: Fonts.RobotoMedium,
                fontSize: FontSize.fontSize14,
              }}
            />
            <Image source={ImagePath.Ic_calendar}></Image>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setOpenEnd(true);
            }}
            style={{
              flex: 1,
              flexDirection: 'row',

              backgroundColor: Colors.DrawerColor,
              marginHorizontal: 2,
              borderRadius: 5,

              justifyContent: 'space-around',
              height: 45,
              alignItems: 'center',
            }}>
            <Caption
              text={
                endDate == null
                  ? 'End Date'
                  : moment(endDate).format('DD/MM/YYYY')
              }
              style={{
                color: Colors.BlackColor,
                fontFamily: Fonts.RobotoMedium,
                fontSize: FontSize.fontSize14,
              }}
            />
            <Image source={ImagePath.Ic_calendar}></Image>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.textInput,
            {
              paddingHorizontal: 0,
              top: 10,
            },
          ]}>
          <RNPickerSelect
            onValueChange={value => {
              if (value !== LeaveData) {
                setLeaveData(value);
              }
            }}
            placeholder={{
              label: 'Leave Type',
              value: 'Leave Type',
            }}
            placeholderTextColor={Colors.textPlaceHolder}
            items={LeaveDataType}
            style={pickerStyle}
            value={LeaveData}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <Image
                  source={ImagePath.Ic_upicon}
                  style={{
                    resizeMode: 'contain',
                  }}></Image>
              );
            }}
          />
        </View>

        <View style={styles.textInputMultiline}>
          <TextInput
            placeholder="Reason"
            multiline={true}
            numberOfLines={5}
            placeholderTextColor={Colors.doveGray}
            onChangeText={value => {
              setreasonData(value);
            }}
            value={reasonData}
            style={{
              alignItems: 'center',
              height: 100,
              textAlignVertical: 'top',
              color: Colors.BlackColor,
              fontSize: FontSize.fontSize16,
              fontFamily: Fonts.RobotoMedium,
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            btnApplyApi();
          }}
          style={{
            top: 10,
            backgroundColor: Colors.Yellow,
            borderRadius: 5,
            marginHorizontal: 20,
            padding: hp(1.5),
            top: hp(10),
          }}>
          <Caption
            text={'SUBMIT'}
            style={[
              styles.titleStyle,
              {
                textAlign: 'center',
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        open={openStart}
        date={startDate == null ? new Date() : startDate}
        mode="date"
        minimumDate={new Date()}
        onConfirm={date => {
          setOpenStart(false);
          setstartDate(date);
        }}
        onCancel={() => {
          setOpenStart(false);
        }}
      />

      <DatePicker
        modal
        open={openEnd}
        mode="date"
        minimumDate={new Date()}
        date={endDate == null ? new Date() : endDate}
        onConfirm={date => {
          setOpenEnd(false);
          setendDate(date);
        }}
        onCancel={() => {
          setOpenEnd(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  mainSpace: {
    marginVertical: hp(2),
    marginHorizontal: wp(3),
  },
  titleStyle: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize14,
    fontFamily: Fonts.RobotoMedium,
  },
  textInputMultiline: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: FontSize.fontSize13,
    height: 100,
    color: Colors.BlackColor,
    paddingHorizontal: 10,
    backgroundColor: Colors.DrawerColor,
    borderRadius: 5,
    top: 15,
  },
  textInput: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: FontSize.fontSize13,
    height: 45,
    color: Colors.BlackColor,
    paddingHorizontal: 10,
    marginVertical: hp(0.6),
    backgroundColor: Colors.DrawerColor,
    borderRadius: 5,
  },
  buttonView: {
    position: 'absolute',
    bottom: hp(2),
    alignSelf: 'center',
  },
  btnStyle: {
    backgroundColor: Colors.Yellow,
    borderRadius: 5,
    marginHorizontal: 2,
    padding: hp(1.5),
    width: wp(80),
  },
});

const pickerStyle = StyleSheet.create({
  inputIOS: {
    paddingTop: 5,
    paddingBottom: 15,
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    height: 45,
  },
  placeholder: {
    color: Colors.BlackColor,
    fontFamily: Fonts.RobotoMedium,
  },
  inputAndroid: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    paddingHorizontal: 10,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

export default LeaveAddScreen;
