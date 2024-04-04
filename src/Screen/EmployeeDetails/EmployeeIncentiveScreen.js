import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
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

const EmployeeIncentiveScreen = ({ navigation, route }) => {
  const loaderContext = useContext(AppContext);
  const [data, setdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [noDataFound, setnoDataFound] = useState(false)

  useEffect(() => {
    getIncentiveScreen(Helper.EmployeeID);
  }, []);

  const getIncentiveScreen = async empID => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return;
        } else {
          loaderContext.showLoader();
          Helper.makeRequest({
            url: ApiUrl.EmployessIncentiveHistory + empID,
            method: 'GET',
          })
            .then(response => {
              if (response.success == true) {
                setdata(response.data.totalIncentiveEarn);
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

  const getTotalIncentive = (db) => {
    if (!Array.isArray(db)) {
      // Handle the case where db is not an array
      console.error('Input is not an array.');
      return 0; // or handle it according to your requirements
    }

    const totalIncentives = db.reduce(
      (sum, incentive) => sum + (incentive?.incentives || 0),
      0
    );

    return totalIncentives;
  };


  const pullToRefreshFunction = () => {
    setRefreshing(true)
    getIncentiveScreen(Helper.ProjectIDD);
    setRefreshing(false)
  }

  return (
    <View style={styles.container}>
      <AppHeader
        leftIcon={ImagePath.Ic_back}
        onClickleftIcon={() => {
          navigation.goBack();
        }}
        title={'Total Incentive Earn'}
        // title={Helper.ProjectIDD}
        rightIcon={ImagePath.Ic_notification}
        onClickrightIcon={() => {
          navigation.navigate('NotificationScreen');
        }}
      />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.White,
            padding: hp(1),
            justifyContent: 'space-between',
          }}>
          <Caption
            text={'Total Incentive Earn'}
            style={[
              styles.titleStyle,
              {
                color: Colors.ThemeColor,
                fontSize: FontSize.fontSize16,
              },
            ]}
          />

          <Caption
            text={getTotalIncentive(data)}
            style={[
              styles.titleStyle,
              {
                color: Colors.ThemeColor,
                fontSize: FontSize.fontSize16,
              },
            ]}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={pullToRefreshFunction}
          />
        }>
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
              <Caption text={'lead name'} style={styles.titleStyle} />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Caption text={'AMOUNT'} style={styles.titleStyle} />
            </View>
          </View>

          {data?.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor:
                    index % 2 !== 0 ? Colors.DrawerColor : Colors.White,
                  padding: hp(1),
                  borderColor: Colors.doveGray,
                  borderWidth: 0.5,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Caption
                    text={getMonthName(item?.month) + ' , ' + item?.year}
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
                    text={item?.leadId?.name}
                    style={styles.titleStyle}
                  />
                  <Caption
                    text={item?.leadId?.phone}
                    style={[
                      styles.titleStyle,
                      {
                        color: Colors.ThemeColor,
                        fontSize: FontSize.fontSize11,
                      },
                    ]}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Caption
                    text={item?.incentives}
                    style={styles.titleStyle}
                  />
                </View>
              </View>
            );
          })}

          {noDataFound == true && data?.length == 0 && (
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
    justifyContent: 'space-between',
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
    maxWidth: wp(60),
    padding: 5,
    borderRadius: 20,
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
    backgroundColor: '#FFD229',
    borderRadius: 10,
  },
});

export default EmployeeIncentiveScreen;
