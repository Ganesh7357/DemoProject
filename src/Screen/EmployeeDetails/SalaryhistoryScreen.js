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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../lip/Colors';
import ImagePath from '../../value/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../lip/Fonts';
import { FontSize } from '../../lip/Fonts';
import Helper from '../../lip/Helper';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';
import Config from '../../lip/Config';
// import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';


// create a component
const SalaryhistoryScreen = ({ navigation, route }) => {
  const loaderContext = useContext(AppContext);

  const [currentUserType, setcurrentUserType] = useState('');
  const [currentUserID, setcurrentUserID] = useState('');
  const [data, setdata] = useState({});
  const [noDataFound, setnoDataFound] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSalaryHistory(Helper.EmployeeID);
      // Refetch data when the tab is focused
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getSalaryHistory(Helper.EmployeeID);
    Helper.getData('userdata').then(res => {
      setcurrentUserID(res._id);
    });
    Helper.getData('role').then(res => {
      setcurrentUserType(res);
    });
    
  }, []);

  const getSalaryHistory = async empID => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return;
        } else {
          loaderContext.showLoader();
          Helper.makeRequest({
            url: ApiUrl.SalaryListApi + empID,
            method: 'GET',
          })
            .then(response => {
              if (response.success == true) {
                setdata(response.data || {});
                setnoDataFound(true)
                loaderContext.hideLoader();
              } else {
                setdata({});
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
  const getMonthName = monthNumber => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Ensure the month number is valid (between 1 and 12)
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    } else {
      return ''; // Handle invalid month number
    }
  };
  const getUserID = async () => {
    return Helper.getData('userdata').then(res => {
      return res._id;
    });
  };
  const getFileName = () => {
    let d = new Date();
    let dformat = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;
    return dformat;
  };
  
  const btnGenerateSalarySlip1 = async (year, month) => {
    try {
      const url =
        Config.baseurl +
        ApiUrl.SalarySilpDownload +
        Helper.EmployeeID +
        `&year=${year}&month=${month}`;
  
      const fileName = getFileName();
      const filePath = RNFS.DownloadDirectoryPath + `/${fileName}.pdf`;
      loaderContext.showLoader();
  
      try {
        // Ensure the download directory exists
        await RNFS.mkdir(RNFS.DownloadDirectoryPath);
  
        const response = await RNFS.downloadFile({
          fromUrl: url,
          toFile: filePath,
          background: true,
          discretionary: true, 
        }).promise;
        loaderContext.hideLoader();
        Helper.showToast('File downloaded!');
      } catch (err) {
        console.error('Download error:', err);
        loaderContext.hideLoader();
      }
    } catch (error) {
      loaderContext.hideLoader();
    }
  };
  
  const btnGenerateSalarySlip = async (yy, mm) => {
    try {
      const url =
      Config.baseurl +
      ApiUrl.SalarySilpDownload +
      Helper.EmployeeID +
      `&year=${yy}&month=${mm}`;
      const fileName = `salary_slip_${getFileName()}.pdf`;
      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      
      loaderContext.showLoader();
      
      // Make sure the directory exists before attempting to create it
      await RNFS.mkdir(RNFS.DownloadDirectoryPath);
      
      const response = await ReactNativeBlobUtil
        .config({ 
          path: filePath ,
          addAndroidDownloads:{
              notification: true,
              title: fileName,
              description: 'File downloaded by download manager.',
              }
        })
        .fetch('GET', url);
      if (response.respInfo.status === 200) {
        Helper.showToast("File downloaded!");
        loaderContext.hideLoader();
      } else {
        loaderContext.hideLoader();
        throw new Error(`Failed to download file: ${response.respInfo.status}`);
      }
      loaderContext.hideLoader();
    } catch (error) {
      console.log(error);
      // Handle error appropriately
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.mainSpace}>
        <View
          style={{
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 2,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Caption text={'Month'} style={styles.btnHeading} />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Caption
                text={'Total \nSalary'}
                style={styles.btnHeading}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Caption
                text={'Advance \nPay'}
                style={styles.btnHeading}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Caption text={'Deduction'} style={styles.btnHeading} />
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#B6B9BB',
              height: 1,
            }}></View>

          {data?.groupedSalaries &&
            Object.keys(data.groupedSalaries).length !== 0 ? (
            <>
              {data?.groupedSalaries &&
                Object.keys(data?.groupedSalaries).map((key, index) => {
                  const salaryEntries = data?.groupedSalaries[key];

                  // Calculate totals for the group
                  const totalIncentives = salaryEntries?.reduce(
                    (sum, item) => sum + item?.incentives,
                    0,
                  );
                  const totalAdvance = salaryEntries?.reduce(
                    (sum, item) => sum + item?.advace,
                    0,
                  );
                  const totalDeductions = salaryEntries?.reduce(
                    (sum, item) => sum + item?.diductions,
                    0,
                  );
                  const totalCreditedSalary = salaryEntries?.reduce(
                    (sum, item) => sum + item?.credited_salary,
                    0,
                  );

                  return (
                    <View
                      key={index}
                      style={{
                        borderBottomColor: '#B6B9BB',
                        borderBottomWidth: 1,
                        paddingVertical: hp(1.5),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                          }}>
                          <Caption
                            text={
                              getMonthName(salaryEntries[0]?.month) +
                              ' , ' +
                              salaryEntries[0]?.year
                            }
                            style={styles.btnlist}
                          />
                        </View>

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                          }}>
                          <Caption
                            text={salaryEntries[0]?.total_salary}
                            style={styles.btnHeading}
                          />
                        </View>

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                          }}>
                          <Caption
                            text={totalAdvance}
                            style={[
                              styles.btnlist,
                              {
                                color: Colors.Green,
                              },
                            ]}
                          />
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            if (
                              typeof data === 'object' &&
                              data !== null
                            ) {
                              const newData = {
                                ...data,
                                groupedSalaries: {
                                  ...data.groupedSalaries,
                                  [key]: data.groupedSalaries[key].map(
                                    (item, i) => {
                                      if (i === index) {
                                        return {
                                          ...item,
                                          Isopen: !item.Isopen,
                                        };
                                      } else {
                                        return item;
                                      }
                                    },
                                  ),
                                },
                              };

                              setdata(newData);
                            } else {
                            }
                          }}
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                          }}>
                          <Caption
                            text={salaryEntries[0]?.diductions}
                            style={[
                              styles.btnlist,
                              {
                                color: Colors.Red,
                              },
                            ]}
                          />
                          <TouchableOpacity
                            style={{
                              justifyContent: 'center',
                              left: 5,
                            }}>
                            <Image
                              source={
                                salaryEntries[0]?.Isopen
                                  ? ImagePath.Ic_DownIcon
                                  : ImagePath.Ic_UpIcondes
                              }
                              style={{
                                resizeMode: 'contain',
                              }}
                            />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </View>

                      {salaryEntries[0]?.Isopen && (
                        <View
                          style={{
                            backgroundColor: '#F5F6FC',
                            marginVertical: hp(2),
                          }}>
                          <View
                            style={[
                              styles.rowContainer,
                              {
                                padding: 5,
                                paddingHorizontal: wp(5),
                              },
                            ]}>
                            <View
                              style={[
                                styles.rowContainer,
                                {
                                  flex: 1,
                                },
                              ]}>
                              <Caption
                                style={styles.btnBlue_}
                                text={'Salary'}></Caption>

                              <Caption
                                style={styles.btnBlue_}
                                text={totalCreditedSalary}></Caption>
                            </View>

                            <View
                              style={[
                                styles.rowContainer,
                                {
                                  flex: 1,
                                },
                              ]}></View>
                          </View>

                          <View style={styles.drawerLine}></View>

                          <View
                            style={[
                              styles.rowContainer,
                              {
                                padding: 5,
                                paddingHorizontal: wp(5),
                              },
                            ]}>
                            <View
                              style={[
                                styles.rowContainer,
                                {
                                  flex: 1,
                                },
                              ]}>
                              <Caption
                                style={styles.btnBlue_}
                                text={'Incentive'}></Caption>

                              <Caption
                                style={styles.btnBlue_}
                                text={totalIncentives}></Caption>
                            </View>

                            <View
                              style={[
                                styles.rowContainer,
                                {
                                  flex: 1,
                                },
                              ]}></View>
                          </View>

                          <View style={styles.drawerLine}></View>

                          {salaryEntries[0]?.comment && (
                            <View
                              style={{
                                padding: 5,
                                paddingHorizontal: wp(5),
                              }}>
                              <Caption
                                style={styles.btnBlue}
                                text={
                                  'Notes:- ' + salaryEntries[0]?.comment
                                }></Caption>
                            </View>
                          )}
                          {salaryEntries[0]?.comment && (
                            <View style={styles.drawerLine}></View>
                          )}

                          <View
                            style={[
                              styles.rowContainer,
                              {
                                paddingHorizontal: wp(5),
                              },
                            ]}>
                            <TouchableOpacity
                              style={styles.btnRound}
                              activeOpacity={0.9}>
                              <Caption
                                style={styles.btnText_}
                                text={'PAID'}></Caption>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => {
                                btnGenerateSalarySlip(
                                  salaryEntries[0]?.year,
                                  salaryEntries[0]?.month,
                                );
                              }}
                              style={styles.btnRound}
                              activeOpacity={0.9}>
                              <Caption
                                style={styles.btnText_}
                                text={'GENERATE SALARY SLIP'}></Caption>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
            </>
          ) : (
            <>
            {noDataFound == true &&(
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',

                marginVertical: hp(5),
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
            </>
          )}
        </View>
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

//make this component available to the app
export default SalaryhistoryScreen;
