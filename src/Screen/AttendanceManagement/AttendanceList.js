import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../component/AppHeader';
import Colors from '../../lip/Colors';
import ImagePath from '../../lip/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../lip/Fonts';
import { FontSize } from '../../lip/Fonts';
import RNPickerSelect from 'react-native-picker-select';
import DropdownComponent from '../../component/DropdownComponent';
import moment from 'moment';
import Helper from '../../lip/Helper';
import NetInfo from '@react-native-community/netinfo';
// import AlertMsg from '../../lip/AlertMsg';
// import ApiUrl from '../../lip/ApiUrl';
// import AppContext from '../../lip/AppContext';
import DatePicker from 'react-native-date-picker';

const AttendanceList = ({ navigation }) => {
  // const //loaderContext = useContext(AppContext);

  const [searchText, setsearchText] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [holidayReson, setholidayReson] = useState('');
  const [userType, setuserType] = useState('');
  const [attendanceListData, setattendanceListData] = useState([]);

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const [userID, setuserID] = useState('');

  const [empList, setempList] = useState([]);
  const [empSelect, setempSelect] = useState('');


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Helper.getData('role').then(res => {
        setuserType(res);
      });
      Helper.getData('userdata').then(res => {
        setuserID(res._id);
        getAttendanceList(res._id);
      });
      // Refetch data when the tab is focused
    });
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    Helper.getData('role').then(res => {
      setuserType(res);
    });
    Helper.getData('userdata').then(res => {
      setuserID(res._id);
      getAttendanceList(res._id);
    });

    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast('INTERNET_CONNECTION');
          return;
        } else {
          //loaderContext.showLoader();
          Helper.makeRequest({ url:'Projects/employeeList', method: 'GET' })
            .then(response => {
              if (response.success == true) {
                var data = response?.data?.employee;
                let _splist = data.map((item, index) => ({
                  label: item.name,
                  value: item._id,
                }));

                setempList(_splist);
              } else {
                //loaderContext.hideLoader();
              }
            })
            .catch(err => {
              //loaderContext.hideLoader();
            });
        }
      });
    } catch (error) { }

  }, []);

  const getAttendanceList = async id => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast('INTERNET_CONNECTION');
          return;
        } else {
          //loaderContext.showLoader();

          Helper.makeRequest({
            url: 'Employees/attendanceList/' + id,
            method: 'GET',
          })
            .then(response => {
              if (response.success == true) {
                setattendanceListData(response?.data?.attList);
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
    } catch (error) {
      //loaderContext.hideLoader();
    }
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

  const showdateTime = dt => {
    if (dt) {
      const input = dt.toString();

      // Extract hours, minutes, and seconds from the input
      const yyyy = input.slice(0, 4);
      const dd = input.slice(6, 8);
      const mm = input.slice(4, 6);

      const ddmmyyyy = `${dd}/${mm}/${yyyy}`;

      return ddmmyyyy;
    }
  };

  const btngetFilter = async (uId, dat1, dat2) => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast('INTERNET_CONNECTION');
          return;
        } else {
          //loaderContext.showLoader();

          Helper.makeRequest({
            url:
            'Employees/attendanceList/' +
              uId +
              `?startDate=${dat1 == null ? '' : moment(dat1).format('YYYYMMDD')
              }&endDate=${dat2 == null ? '' : moment(dat2).format('YYYYMMDD')}`,
            method: 'GET',
          })
            .then(response => {
              if (response.success == true) {
                setattendanceListData(response?.data?.attList);
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
    } catch (error) {
      //loaderContext.hideLoader();
    }
  };

  return (
    <View style={styles.container}>
      {/* <AppHeader
        leftIcon={ImagePath.Ic_back}
        onClickleftIcon={() => {
          navigation.goBack();
        }}
        title={'Attendance Management'}
        rightIcon={ImagePath.Ic_notification}
        onClickrightIcon={() => {
          navigation.navigate('NotificationScreen');
        }}
      /> */}
      <View style={styles.mainSpace}>
        <View
          style={{
            backgroundColor: Colors.White,
            top: hp(1),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => {
                setOpenStart(true);
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: Colors.DrawerColor,
                borderRadius: 5,
                margin: 8,
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
              onPress={() => {
                setOpenEnd(true);
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: Colors.DrawerColor,
                borderRadius: 5,
                margin: 8,
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
        </View>

        {userType == 'Admin' ? (
          <View
            style={{
              fontFamily: Fonts.RobotoRegular,
              fontSize: FontSize.fontSize13,
              // height: 45,
              color: Colors.BlackColor,
              paddingHorizontal: 10,
              backgroundColor: Colors.DrawerColor,
              borderWidth: 1,
              borderColor: Colors.Gray,
              borderRadius: 5,
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            <RNPickerSelect
              onValueChange={value => {
                if (value !== empSelect) {
                  setempSelect(value);
                  btngetFilter(value, startDate, endDate);
                }else{
                
                }
              }}
              placeholder={{
                label: 'Employee Name',
                value: 'Employee Name',
              }}
              useNativeAndroidPickerStyle={false}
              placeholderTextColor={Colors.textPlaceHolder}
              items={empList}
              value={empSelect}
              style={pickerStyle}
              Icon={() => {
                return <Image source={ImagePath.Ic_upicon}></Image>;
              }}
            />

            {/* <DropdownComponent
              data={empList}
              placeholder="Select Employee"
              value={empSelect}
              onClickrightIcon={value => {
                if (value !== empSelect) {
                  setempSelect(value);
                  btngetFilter(value, startDate, endDate);
                } else {

                }
              }}
              viewPosition="bottom"
              style={{
                backgroundColor: Colors.DrawerColor,
                // borderColor: Colors.Gray,
                // borderWidth: 1,
                fontFamily: Fonts.RobotoMedium,
                fontSize: FontSize.fontSize13,
                height: 45,
                color: Colors.BlackColor,
                fontWeight: '400',
                paddingHorizontal: 10,
              }}
            /> */}


          </View>
        ) : (
          <View
            style={{
              marginVertical: 10,
            }}></View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} style={{
          marginBottom: hp(26)
        }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.DrawerColor,
              padding: hp(1),
              borderColor: Colors.doveGray,
              borderWidth: 1,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Caption text={'DATE'} style={styles.titleStyle} />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Caption text={'IN TIME'} style={styles.titleStyle} />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Caption text={'OUT TIME'} style={styles.titleStyle} />
            </View>
          </View>
          {attendanceListData.length > 0 ? (
            <>
              {attendanceListData?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: index % 2 !== 0 ? Colors.DrawerColor : Colors.White,
                      padding: hp(1),
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Caption
                        text={showdateTime(item?.attDate)}
                        style={styles.titleStyle}
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Caption
                        text={showpunchTime(item?.punchInTime)}
                        style={styles.titleStyle}
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Caption
                        text={showpunchTime(item?.punchOutTime)}
                        style={styles.titleStyle}
                      />
                    </View>
                  </View>
                );
              })}
            </>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flex: 1,
                marginVertical: hp(2),
              }}>
              <Text
                style={{
                  color: '#333333',
                  fontSize: FontSize.fontSize18,
                  letterSpacing: 0.5,
                  textAlign: 'center',
                  fontFamily: Fonts.NunitoExtraBold,
                  textAlignVertical: 'center',
                }}>
                No record found !
              </Text>
            </View>
          )}

        </ScrollView>
      </View>

      <DatePicker
        modal
        open={openStart}
        mode="date"
        date={startDate == null ? new Date() : startDate}
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
        date={endDate == null ? new Date() : endDate}
        onConfirm={date => {
          setOpenEnd(false);
          setendDate(date);
          btngetFilter(userID, startDate, date);
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
    // marginVertical: hp(2),
    // marginHorizontal: wp(3),
  },
  marginView: {
    marginVertical: hp(1),
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCss: {
    backgroundColor: Colors.DrawerColor,
    flex: 1,
    borderRadius: 5,
    marginHorizontal: wp(2),
  },
  InputCss: {
    height: 45,
    paddingHorizontal: 10,
    color: Colors.BlackColor,
    fontFamily: Fonts.RobotoRegular,
  },
  btnFilter: {
    backgroundColor: Colors.DrawerColor,
    padding: 10,
    borderRadius: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBox: {
    flexDirection: 'row',
    backgroundColor: Colors.DrawerColor,
    borderWidth: wp(0.3),
    borderRadius: 20,
    borderColor: Colors.BorderColor,
    paddingHorizontal: wp(2),
    padding: hp(1),
  },
  imgStyle: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  btnFab: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    flex: 1,
    borderRadius: 5,
  },
  imgStyle: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.textPlaceHolder,
    fontFamily: Fonts.RobotoRegular,
    fontSize: FontSize.fontSize13,
    height: 45,
    color: Colors.BlackColor,
    paddingHorizontal: 10,
    marginVertical: hp(0.5),
  },
  signInTxt: {
    color: '#333333',
    fontSize: FontSize.fontSize18,
    letterSpacing: 0.5,
    textAlign: 'center',
    fontFamily: Fonts.NunitoExtraBold,
    textAlignVertical: 'center',
  },
  titleStyle: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize14,
    fontFamily: Fonts.RobotoMedium,
  },
  flexRow: {
    flex: 1,
  },
});

const pickerStyle = StyleSheet.create({
  inputIOS: {
    paddingTop: 5,
    paddingBottom: 15,
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
  },
  placeholder: {
    color: Colors.BlackColor,
    fontFamily: Fonts.RobotoMedium,
    fontSize: FontSize.fontSize13,
  },
  inputAndroid: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    paddingHorizontal: 10,
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
});

export default AttendanceList;
