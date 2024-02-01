import React, { useState, useEffect, useContext } from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import AppHeader from '../../component/AppHeader';
import Colors from '../../component/Colors';
import ImagePath from '../../Lip/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../component/Fonts';
import { FontSize } from '../../component/Fonts';

// import AppContext from '../../lip/AppContext';
// import moment from 'moment';
import Helper from '../../Lip/Helper';
import NetInfo from '@react-native-community/netinfo';
// import AlertMsg from '../../lip/AlertMsg';
// import ApiUrl from '../../lip/ApiUrl';
import Config from '../../Config';

const LeaveListEmployee = ({ navigation }) => {
    //   const //loaderContext = useContext(AppContext);

    const [leaveList, setleaveList] = useState([]);


    useEffect(() => {
        console.log('leaveList',leaveList)
        const unsubscribe = navigation.addListener('focus', () => {
            Helper.getData('userdata').then(res => {
                getLeaveHistory(res._id);
            });
            // Refetch data when the tab is focused
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        Helper.getData('userdata').then(res => {
            getLeaveHistory(res._id);
        });
    }, []);

    const getLeaveHistory = async id => {
        try {
            NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                    Helper.showToast('INTERNET_CONNECTION');
                    return;
                } else {
                    //loaderContext.showLoader();
                    Helper.makeRequest({ url: 'Employees/leaveList' + `?empId=${id}`, method: 'GET' })
                        .then(response => {
                            if (response.success == true) {
                                setleaveList(response.data.leaveRequests);
                                console.log('response.data.leaveRequests=====>',response.data.leaveRequests)
                                //loaderContext.hideLoader();
                            } else {
                                setleaveList([]);
                                //loaderContext.hideLoader();
                            }
                        })
                        .catch(err => {
                            //loaderContext.hideLoader();
                        });
                }
            });
        } catch (error) { }
    };

    const formatDate = timestamp => {

        const timestampString = String(timestamp);

        // Convert the timestamp to a valid JavaScript timestamp
        const date = new Date(
            timestampString.substring(0, 4),
            timestampString.substring(4, 6) - 1,
            timestampString.substring(6, 8),
        );

        // Format the date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainSpace}>
               
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    marginBottom: 40
                }}>
                    {leaveList?.map((item, index) => {
                        return (
                            <View key={index}>
                                <View
                                    style={{
                                        backgroundColor: '#fff',
                                        flexDirection: 'row',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        padding: 10,
                                        borderRadius: 5,
                                    }}>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            //left: 5,
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
                                            style={styles.picImage}></Image>
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            left: 10,
                                            flex: 1,
                                        }}>
                                        <Caption
                                            text={item?.employee_id?.name}
                                            style={[
                                                styles.titleStyle,
                                                {
                                                    left: 0,
                                                },
                                            ]}
                                        />
                                        {item?.dates.length > 1 ? (
                                            <Caption
                                                text={`${formatDate(item?.dates[0]?.date)} - ${formatDate(
                                                    item?.dates[item?.dates?.length - 1].date,
                                                )}`}
                                                style={[
                                                    styles.titleStyle,
                                                    {
                                                        left: 0,
                                                        fontFamily: Fonts.RobotoRegular,
                                                        fontSize: FontSize.fontSize12,
                                                    },
                                                ]}
                                            />
                                        ) : (
                                            <Caption
                                                text={formatDate(item?.dates[0]?.date)}
                                                style={[
                                                    styles.titleStyle,
                                                    {
                                                        left: 0,
                                                        fontFamily: Fonts.RobotoRegular,
                                                        fontSize: FontSize.fontSize12,
                                                    },
                                                ]}
                                            />
                                        )}

                                        <Caption
                                            text={item.dayCount}
                                            style={[
                                                styles.btnBlue,
                                                {
                                                    left: 0,
                                                },
                                            ]}
                                        />

                                        {item?.notes && (
                                            <Caption
                                                text={`Notes - ${item?.notes}`}
                                                style={[
                                                    styles.btnBlue,
                                                    {
                                                        left: 0,
                                                    },
                                                ]}
                                            />
                                        )}

                                    </View>

                                    {item.status == 'Approved' && (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'flex-end',
                                            }}>
                                            <Image source={ImagePath.Ic_LeaveCheck} />
                                        </View>
                                    )}

                                    {item?.status == 'Pending' && (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'flex-end',
                                            }}>
                                            <Image source={ImagePath.Ic_LeaveSignleMark} />
                                        </View>
                                    )}

                                    {item?.status == 'Rejected' && (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'flex-end',
                                            }}>
                                            <Image source={ImagePath.Ic_LeaveCancel} />
                                        </View>
                                    )}
                                </View>

                                <View
                                    style={{
                                        backgroundColor: '#B6B9BB',
                                        height: 1,
                                    }}></View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.btnFab}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('LeaveAddScreen');
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
    topView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        borderRadius: 5,
    },
    picImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        borderRadius: 15,
    },
    titleStyle: {
        color: Colors.BlackColor,
        fontSize: FontSize.fontSize13,
        fontFamily: Fonts.RobotoMedium,
        left: 10,
    },
    btnBlue: {
        fontSize: FontSize.fontSize13,
        fontFamily: Fonts.RobotoRegular,
        color: Colors.ThemeColor,
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
    btnText: {
        textAlign: 'center',
        padding: hp(1.3),
        color: Colors.White,
        fontSize: FontSize.fontSize14,
        fontFamily: Fonts.RobotoMedium,
    },
    btnColor: {
        marginHorizontal: wp(5),
        marginVertical: hp(1.2),
        borderRadius: 5,
    },
});
export default LeaveListEmployee;
