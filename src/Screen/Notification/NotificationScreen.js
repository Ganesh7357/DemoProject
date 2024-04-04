import React, { useState, useEffect, useContext } from 'react';

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  Linking
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../component/AppNotificationHeader';
import Colors from '../../value/Colors';
import ImagePath from '../../value/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../value/Fonts';
import { FontSize } from '../../value/Fonts';
import moment from 'moment';
import Helper from '../../lip/Helper';
import Config from '../../lip/Config';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';

const NotificationScreen = ({ navigation }) => {
  const loaderContext = useContext(AppContext);
  const [data, setdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [noDataFound, setnoDataFound] = useState(false)
  useEffect(() => {
    getNotificationList();
  }, []);

  const getNotificationList = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return;
        } else {
          loaderContext.showLoader();
          Helper.makeRequest({
            url: ApiUrl.EmployeeNotificationApi,
            method: 'GET',
          })
            .then(response => {
              if (response.success == true) {
                setdata(response.data.notification);
                setnoDataFound(true)
                loaderContext.hideLoader();
              } else {
                Helper.showToast(response.message)
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

  const pullToRefreshFunction = () => {
    setRefreshing(true);
    getNotificationList();
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <AppHeader
        leftIcon={ImagePath.Ic_back}
        onClickleftIcon={() => {
          navigation.goBack();
        }}
        title={'Notification'}
      />
      <View style={styles.mainSpace}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={pullToRefreshFunction}
            />
          }>
          
          {data.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: hp(1),
                    marginHorizontal: wp(3),
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      if (item?.type == 'project') {
                        // navigation.navigate('ProjectDetailsScreen')
                        Helper.ProjectIDD = item?.projectId
                        Helper.ProjectDetails = item
                        console.log('ProjectDetailsScreen open', item)
                      } else if (item?.type == 'Lead') {
                        // navigation.navigate('LeadDetailsScreen')
                        Helper.LeadID = item?.leadId

                        console.log('LeadDetailsScreen open', item?.leadId)
                      } else if (item?.type == 'employee') {
                        // navigation.navigate('EmployeeDetailsScreen')
                        Helper.EmployeeID = item?.employee_id
                        console.log('EmployeeDetailsScreen open', item?.employee_id)
                      } else if (item?.type == 'location') {
                        console.log('item?.type', item?.type)
                        // const latitude = item?.loc?.coordinates?.[0]
                        // const longitude = item?.loc?.coordinates?.[1]
                        // const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                        // Linking.openURL(url);
                      } else if (item?.type == 'Leave Application') {
                        console.log('item?.type', item?.type)
                        navigation.navigate('LeaveListScreen')
                      } else {
                        console.log('item?.type===>', item?.type)
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Image
                      source={
                        item?.employee_id?.profile_pitcture
                          ? {
                            uri:
                              Config.imageBaseUrl +
                              item?.employee_id?.profile_pitcture,
                          }
                          : ImagePath.Ic_avatar
                      }
                      style={{
                        height: 41,
                        width: 41,
                        resizeMode: 'contain',
                      }}></Image>

                    <View
                      style={{
                        left: 8,
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                      <View style={{
                        flexDirection: 'row'
                      }}>
                        <Caption
                          text={item?.employee_id?.name}
                          style={styles.titleStyle}
                        />
                        {item?.type == 'location' && (
                          <Image source={ImagePath.Ic_location}
                            style={{
                              height: 15,
                              width: 15,
                              resizeMode: 'contain',
                              marginLeft: 5
                            }}
                          />
                        )}
                      </View>
                      {item?.type == 'Leave Application' && (
                        <Caption
                          text={item?.title}
                          style={styles.titleSubTitle}
                        />
                      )}
                      <Caption
                        text={item?.description}
                        style={styles.titleSubTitle}
                      />

                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      justifyContent: 'flex-end',
                      // bottom:16,
                      marginBottom: 15
                      // alignSelf:'flex-end'
                    }}>
                    <Caption
                      text={moment(item?.created).format('DD/MM/YY')}
                      style={styles.titleDate}
                    />
                    <Caption
                      text={moment(item?.created).format('hh:mm A')}
                      style={styles.titleDate}
                    />
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#C4C4C4',
                    height: 1,
                  }}></View>
              </View>
            );
          })}
        </ScrollView>
        {noDataFound == true && data.length == 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              flex: 1,
              marginVertical: hp(1),
              marginHorizontal: wp(3),
            }}>
            <Caption
              text={'No new notification found!'}
              style={[
                styles.titleStyle,
                {
                  textAlign: 'center',
                },
              ]}
            />
          </View>
        )}
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
    flex: 1,
  },
  titleStyle: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize14,
    fontFamily: Fonts.RobotoMedium,
  },
  titleDate: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: FontSize.fontSize10,
    color: Colors.DateColor,
  },
  titleSubTitle: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: FontSize.fontSize12,
    color: Colors.DateColor,
    marginRight: 10
  },
});
export default NotificationScreen;
