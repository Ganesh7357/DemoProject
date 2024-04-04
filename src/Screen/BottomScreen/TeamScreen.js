import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
  RefreshControl,
  Keyboard
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

import Helper from '../../lip/Helper';
import Config from '../../lip/Config';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';

const TeamScreen = ({ navigation }) => {
  const loaderContext = useContext(AppContext);

  const [searchText, setsearchText] = useState('');
  const [data, setdata] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [noDataFound, setnoDataFound] = useState(false)


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
      searchFilterFunction("") 
      // Refetch data when the tab is focused
    });

    // Cleanup the subscription when the component is unmounted
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    let updatList = DeviceEventEmitter.addListener(
      'EmployeeListUpdate',
      response => {
        getData();
      },
    );
    return () => {
      updatList.remove();
    };
  }, []);


  const getData = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return;
        } else {
          // loaderContext.showLoader();
          Helper.makeRequest({ url: ApiUrl.AllEmployee, method: 'GET' })
            .then(response => {
              if (response.success == true) {
                if (response?.data?.employee.length > 0) {
                  setdata(response?.data?.employee)
                  setFilteredDataSource(response?.data?.employee)
                  setRefreshing(false)
                  setnoDataFound(true)
                  loaderContext.hideLoader();
                } else {
                  setRefreshing(false)
                  loaderContext.hideLoader();
                  if (response.message == 'Unauthorized access.') {
                    Helper.removeItemValue('userdata');
                    Helper.removeItemValue('token');
                    Helper.removeItemValue('role');

                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    });
                  }
                }
              } else {
                loaderContext.hideLoader();
              }
            })
            .catch(err => {
              loaderContext.hideLoader();
            });
        }
      });
    } catch (error) { }
  };

  const btnStatusChange = async (id, status) => {
    if (status == true) {
      Helper.confirmPopUp('Are you sure you want to Disable this.', res => {
        if (res) {
          try {
            NetInfo.fetch().then(state => {
              if (!state.isConnected) {
                Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
                return;
              } else {
                loaderContext.showLoader();
                Helper.makeRequest({ url: ApiUrl.EmployeeStatus + id, method: 'POST' })
                  .then(response => {

                    if (response.success == true) {
                      loaderContext.hideLoader();
                      getData();
                    } else {
                      loaderContext.hideLoader();
                    }
                  })
                  .catch(err => {
                    loaderContext.hideLoader();
                  });
              }
            });

          } catch (error) {

          }
        }
      });
    } else {
      Helper.confirmPopUp('Are you sure you want to Enable this.', res => {
        if (res) {
          try {
            NetInfo.fetch().then(state => {
              if (!state.isConnected) {
                Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
                return;
              } else {
                loaderContext.showLoader();
                Helper.makeRequest({ url: ApiUrl.EmployeeStatus + id, method: 'POST' })
                  .then(response => {

                    if (response.success == true) {
                      loaderContext.hideLoader();
                      getData();
                    } else {
                      loaderContext.hideLoader();
                    }
                  })
                  .catch(err => {
                    loaderContext.hideLoader();
                  });
              }
            });

          } catch (error) {

          }
        }
      });
    }


  }

  const btnDelete = async (id) => {
    Helper.confirmPopUp('Are you sure you want to Delete this?', res => {
      if (res) {
        try {
          NetInfo.fetch().then(state => {
            if (!state.isConnected) {
              Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
              return;
            } else {
              loaderContext.showLoader();
              Helper.makeRequest({ url: ApiUrl.DeleteEmployee + id, method: 'DELETE' })
                .then(response => {

                  if (response.success == true) {
                    loaderContext.hideLoader();
                    getData();
                    Helper.showToast(response.message)
                  } else {
                    loaderContext.hideLoader();
                  }
                })
                .catch(err => {
                  loaderContext.hideLoader();
                });
            }
          });

        } catch (error) {

        }
      }
    });

  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = filteredDataSource.filter((item) => {
        const nameData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const phoneData = item.mobile ? item.mobile.toString() : ''.toUpperCase();
        const searchText = text.toUpperCase();
        return nameData.includes(searchText) || phoneData.includes(searchText);
      });
      setdata(newData);
      setsearchText(text);
    } else {
      setdata(filteredDataSource);
      setsearchText(text);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true)
    getData();
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <AppHeader
        leftIcon={ImagePath.Ic_menu}
        onClickleftIcon={() => {
          navigation.toggleDrawer();
        }}
        title={'Team'}
        rightIcon={ImagePath.Ic_notification}
        onClickrightIcon={() => {
          // navigation.navigate('NotificationScreen');s
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              onRefresh();
            }}
            refreshing={refreshing}
            enabled={true}
          />
        }>
        <View style={styles.mainSpace}>
          <View
            style={[
              styles.rowBox,
              {
                top: hp(1),
              },
            ]}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.textCss}>
                <TextInput
                  placeholder="Search by Name/Phone number"
                  placeholderTextColor={Colors.PlaceholderColor}
                  style={styles.InputCss}
                  value={searchText}
                  // keyboardType="phone-pad"
                  onChangeText={(text) => searchFilterFunction(text)}></TextInput>
              </TouchableOpacity>
            </View>

            <View style={styles.rowBox}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.btnFilter,
                  {
                    right: 3,
                  },
                ]}>
                <Image
                  source={ImagePath.Ic_search}
                  style={{
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Caption
            text={'Team board'}
            style={{
              color: Colors.BlackColor,
              fontFamily: Fonts.RobotoMedium,
              fontSize: FontSize.fontSize14,
              marginVertical: hp(3),
              left: 10,
            }}
          />
          <ScrollView>
            {data?.map((item, index) => {
              return (
                <View style={styles.itemBox} key={index}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        item?.profile_pitcture ? {
                          uri: Config.imageBaseUrl + item?.profile_pitcture
                        } :
                          ImagePath.Ic_avatar}
                      style={{
                        resizeMode: 'contain',
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                      }}></Image>

                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('EmployeeDetailsScreen', {
                          item: item?._id,
                          name: item?.name,
                        });
                        Helper.EmployeeID = item?._id
                      }}
                      activeOpacity={0.9}
                    >
                      <Caption
                        text={item?.name}
                        style={{
                          color: Colors.BlackColor,
                          fontFamily: Fonts.RobotoMedium,
                          fontSize: FontSize.fontSize14,
                          left: 5,
                          textAlign: 'justify'
                        }}
                      />

                      <Caption
                        text={item?.mobile}
                        style={{
                          color: Colors.BlackColor,
                          fontFamily: Fonts.RobotoRegular,
                          fontSize: FontSize.fontSize14,
                          left: 5,
                        }}
                      />
                      <Caption
                        text={"OTP - " + item?.otp}
                        style={{
                          color: Colors.BlackColor,
                          fontFamily: Fonts.RobotoRegular,
                          fontSize: FontSize.fontSize14,
                          left: 5,
                        }}
                      />

                      <Caption
                        text={item?.role}
                        style={{
                          color: Colors.BlackColor,
                          fontFamily: Fonts.RobotoRegular,
                          fontSize: FontSize.fontSize14,
                          left: 5,
                        }}
                      />


                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',

                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('EditEmployeeScreen', {
                          item: item
                        });
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        right: 30,
                      }}>
                      <Image
                        source={ImagePath.Ic_editpencil}
                        style={{
                          resizeMode: 'contain',
                        }}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        btnStatusChange(item?._id, item?.status)

                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        right: 15,
                      }}>
                      <Image
                        source={item?.status ? ImagePath.Ic_switchOn : ImagePath.Ic_switchBtn}
                        style={{
                          resizeMode: 'contain',
                        }}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        btnDelete(item?._id)
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Image
                        source={ImagePath.Ic_cancel}
                        style={{
                          resizeMode: 'contain',
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          
              { noDataFound == true && data?.length == 0 && (
                <View style={{
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
                    no record found !
                  </Text>
                </View>
              )}
        </View>
      </ScrollView>
      <View style={styles.btnFab}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddEmployeeScreen');
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            alignItems: 'center',
            marginVertical: 5,

          }}>
          <Image source={ImagePath.Ic_addlead} style={styles.imgStyle}></Image>
        </TouchableOpacity>
      </View>
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
    marginVertical: hp(1),
  },
  // imgStyle: {
  //   height: 36,
  //   width: 36,
  //   resizeMode: 'contain',
  // },
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
});

export default TeamScreen;
