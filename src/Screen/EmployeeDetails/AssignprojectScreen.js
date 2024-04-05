import React, { useEffect, useState, useRef, useContext } from 'react';
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
  DeviceEventEmitter
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../lip/Colors';
import ImagePath from '../../lip/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../lip/Fonts';
import { FontSize } from '../../lip/Fonts';
import RNPickerSelect from 'react-native-picker-select';
import Helper from '../../lip/Helper';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';

// create a component
const AssignProjectScreen = ({ navigation, route }) => {
  const loaderContext = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const [projectData, setprojectData] = useState([]);
  const [projectSelect, setprojectSelect] = useState('');
  const [assignProjectList, setassignProjectList] = useState([]);
  const [currentUserType, setcurrentUserType] = useState('');
  const [currentUserID, setcurrentUserID] = useState('');
  const [noDataFound, setnoDataFound] = useState(false)


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProjectData();
      // Refetch data when the tab is focused
    });

    // Cleanup the subscription when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getProjectData();
    getAssignEmployeeList()
    Helper.getData('userdata').then(res => {
      setcurrentUserID(res._id);
    });
    Helper.getData('role').then(res => {
      setcurrentUserType(res);
    });
  }, []);

  const pullToRefreshFunction = () => {
    setRefreshing(true);
    getAssignEmployeeList();
    setRefreshing(false);
  };

  const getAssignEmployeeList = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return;
        } else {
          loaderContext.showLoader();
          Helper.makeRequest({
            url: ApiUrl.ProjectAssignedToEmployee + Helper.EmployeeID,
            method: 'GET',
          })
            .then(response => {
              if (response.success == true) {
                var data = response?.data?.assignedProject;
                setassignProjectList(data.slice().reverse());
                setnoDataFound(true)
                loaderContext.hideLoader();
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
  const selectProjectApi = async (value) => {
    try {
      if (projectSelect !== 'Select Project') {
        NetInfo.fetch().then(state => {
          if (!state.isConnected) {
            Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
            return;
          } else {
            loaderContext.showLoader();
            var db = {
              projectId: value,
              assignTo: Helper.EmployeeID,
            };
             Helper.makeRequest({
              url: ApiUrl.ProjectassignProject,
              method: 'POST',
              data: db,
            })
              .then(response => {
                if (response.success == true) {
                  getAssignEmployeeList();
                  loaderContext.hideLoader();
                } else {
                  Helper.showToast(response.message);
                  loaderContext.hideLoader();
                }
              })
              .catch(err => {
                loaderContext.hideLoader();
              });
          }
        });
      }
    } catch (error) { }
  };
  const getProjectData = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return;
        } else {
          loaderContext.showLoader();
          Helper.makeRequest({ url: ApiUrl.LeadProjectList, method: 'GET' })
            .then(response => {
              if (response.success == true) {
                var data = response?.data?.project;

                let _splist = data?.map((item, index) => ({
                  label: item.name,
                  value: item._id,
                }));

                setprojectData(_splist);

                loaderContext.hideLoader();
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
  const btnDelete = async Id => {
    try {
      Helper.confirmPopUp('Are you sure you want to Delete this?', res => {
        if (res) {
          NetInfo.fetch().then(state => {
            if (!state.isConnected) {
              Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
              return;
            } else {
              loaderContext.showLoader();
              Helper.makeRequest({
                url: ApiUrl.DeleteAssignedEmployee + Id,
                method: 'DELETE',
              })
                .then(response => {
                  if (response.success == true) {
                    loaderContext.hideLoader();

                    getAssignEmployeeList();
                  } else {
                    loaderContext.hideLoader();
                  }
                })
                .catch(err => {
                  loaderContext.hideLoader();
                });
            }
          });
        }
      });
    } catch (error) { }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={pullToRefreshFunction}
          />
        }>
        <View style={styles.mainSpace}>
          <View
            style={[
              styles.textInput,
              {
                paddingHorizontal: 0,
                backgroundColor: Colors.DrawerColor,
                borderColor: Colors.DrawerColor,
                borderWidth: 1,
                borderRadius: 5,
              },
            ]}>
            <RNPickerSelect
              onValueChange={value => {
                if (value !== projectSelect) {
                  setprojectSelect(value); // Update the state with the selected value
                  selectProjectApi(value); // Call the selectEmpApi function with the selected value
                } else {
                  if (projectSelect !== 'Select Project') {
                    Helper.showToast('This project is already added')
                  }
                }
              }}
              placeholder={{
                label: 'Select Project',
                value: 'Select Project',
              }}
              value={projectSelect}
              placeholderTextColor={Colors.textPlaceHolder}
              items={projectData}
              style={pickerStyle}
              mode="dropdown"
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
              marginVertical: hp(0.6),
            }}></View>
          {assignProjectList?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  paddingHorizontal: 10,
                  marginVertical: hp(0.6),
                  borderWidth: 1,
                  borderColor: Colors.DrawerColor,
                  borderRadius: 5,
                  flexDirection: 'row',
                  paddingVertical: hp(1.4),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <Image
                        source={
                          item?.assignTo?.profile_pitcture
                            ? {
                                uri:
                                  Config.imageBaseUrl +
                                  item?.assignTo?.profile_pitcture,
                              }
                            : ImagePath.Ic_avatar
                        }
                        style={{
                          height: 35,
                          width: 35,
                          resizeMode: 'contain',
                          borderRadius: 18,
                        }}></Image> */}

                  <Caption
                    text={item?.projectId?.name}
                    style={{
                      // left: 10,
                      color: Colors.BlackColor,
                      fontSize: FontSize.fontSize16,
                      fontFamily: Fonts.RobotoMedium,
                    }}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    btnDelete(item?._id);
                  }}
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Image source={ImagePath.Ic_cancel}></Image>
                </TouchableOpacity>
              </View>
            );
          })}

          {noDataFound == true && (
            <>
              {assignProjectList.length == 0 && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flex: 1,
                    paddingVertical: hp(8),
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
                    No Project Found!
                  </Text>
                </View>
              )}
            </>
          )}

        </View>
      </ScrollView>
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
  btnStyle: {
    backgroundColor: Colors.Yellow,
    borderRadius: 50,
    marginHorizontal: 2,
    // padding: hp(0.5),
  },
  flexView: {
    flex: 1,
  },
  'ml-15': {
    marginLeft: 15,
  },
  profileBoxShadow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  cardIn: {
    fontSize: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeader: {
    color: Colors.doveGray,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
  },
  notificationBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    padding: hp(1),
    marginVertical: hp(1),
  },
  topTabMainViewcss: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  topTabUnActiveCss: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    textAlign: 'center',
    padding: hp(1),
  },
  topTabActiveCss: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    textAlign: 'center',
    padding: hp(1),
  },
  btnHeader: {
    color: Colors.BlackColor,
    fontFamily: Fonts.RobotoMedium,
    fontSize: FontSize.fontSize14,
    marginVertical: hp(1),
    left: 10,
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    textAlign: 'center',
    fontWeight: '500',
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
  },
  view2: {
    flex: 1,
    justifyContent: 'center',
    left: wp(5),
  },
  dividerLine: {
    backgroundColor: Colors.BColor,
    height: 1,
    marginVertical: hp(1),
  },
  btnEditview: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
  },
  headingText: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize18,
    fontFamily: Fonts.RobotoMedium,
    right: 10,
  },
  imgStyle: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 200,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.textPlaceHolder,
    fontFamily: Fonts.RobotoMedium,
    fontSize: FontSize.fontSize13,
    height: 45,
    color: Colors.BlackColor,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  textInput1: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: FontSize.fontSize13,
    height: 45,
    color: Colors.BlackColor,
    paddingHorizontal: 10,
    backgroundColor: Colors.DrawerColor,
    borderRadius: 5,
    top: hp(5),
    flexDirection: 'row',
  },
  signInTxt: {
    color: '#333333',
    fontSize: FontSize.fontSize18,
    letterSpacing: 0.5,
    textAlign: 'center',
    fontFamily: Fonts.NunitoExtraBold,
    textAlignVertical: 'center',
  },
  addSelfiBtn: {
    borderColor: '#656565',
    borderWidth: 1,
    padding: 2,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoRegular,
    paddingHorizontal: 10,
  },
  flxend: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },

  flexRow: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: '#00BFFF',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  balloon: {
    maxWidth: wp(100),
    padding: 5,
    borderRadius: 20,
    flex: 1,
  },
  itemIn: {
    alignSelf: 'flex-start',
  },
  itemOut: {
    alignSelf: 'flex-end',
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 12,
    color: '#808080',
  },
  item: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 210, 41, 0.4)',
    borderRadius: 10,
  },

  btnHeading: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    textAlign: 'center',
  },
  btnlist: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    textAlign: 'center',
  },
  btnBlue: {
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.ThemeColor,
  },
  btnBlue_: {
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.BlackColor,
  },
  btnNew: {
    backgroundColor: Colors.Green,

    borderRadius: 5,
  },
  rowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  drawerLine: {
    backgroundColor: '#B6B9BB',
    height: 1,
  },
  btnRound: {
    backgroundColor: Colors.GreenColor,
    marginVertical: hp(1),
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  btnText_: {
    fontSize: FontSize.fontSize13,
    textAlign: 'center',
    fontFamily: Fonts.RobotoMedium,
    color: Colors.White,
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
    right: 10,
  },
});

//make this component available to the app
export default AssignProjectScreen;
