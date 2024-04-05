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
import ImagePath from '../../lip/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../lip/Fonts';
import { FontSize } from '../../lip/Fonts';
import Helper from '../../lip/Helper';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

// create a component
const AttendanceScreen = ({ navigation, route }) => {
    const loaderContext = useContext(AppContext);
    const [attendanceListData, setattendanceListData] = useState([]);
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [currentUserID, setcurrentUserID] = useState('');
    const [currentUserType, setcurrentUserType] = useState('');
    const [noDataFound, setnoDataFound] = useState(false)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAttendanceList();
            // Refetch data when the tab is focused
        });

        // Cleanup the subscription when the component is unmounted
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getAttendanceList(Helper.EmployeeID, startDate, endDate);
        Helper.getData('userdata').then(res => {
            setcurrentUserID(res._id);
        });
        Helper.getData('role').then(res => {
            setcurrentUserType(res);
        });
    }, []);

    const getAttendanceList = async (uId, dat1, dat2) => {
        try {
            NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                    Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
                    return;
                } else {
                    loaderContext.showLoader();

                    Helper.makeRequest({
                        url:
                            ApiUrl.EmployeeAttendanceList +
                            Helper.EmployeeID +
                            `?startDate=${dat1 == null ? '' : moment(dat1).format('YYYYMMDD')
                            }&endDate=${dat2 == null ? '' : moment(dat2).format('YYYYMMDD')}`,
                        method: 'GET',
                    })
                        .then(response => {
                            if (response.success == true) {
                                setattendanceListData(response?.data?.attList);
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
        } catch (error) {
            loaderContext.hideLoader();
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
    const showpunchTime = st => {
        if (st) {
            const input = st.toString();

            // Extract hours, minutes, and seconds from the input
            let hours = input.slice(0, 2);
            const minutes = input.slice(2, 4);
            const seconds = input.slice(4, 6);

            // Ensure hours are within the 12-hour range
            hours = (parseInt(hours) % 24).toString().padStart(2, '0');

            // Determine AM or PM
            // const period = parseInt(hours) < 12 ? 'AM' : 'PM';

            // Format the time as hh:mm:ss AM/PM
            const hhmmss = `${hours}:${minutes}:${seconds}`;

            return hhmmss; // Return the formatted time
        }
    };
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.mainSpace}>
                    <Caption
                        text={'Attendance Management'}
                        style={styles.btnHeader}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            top: 5,
                        }}>
                        <TouchableOpacity
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
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
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
                    {attendanceListData?.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: Colors.White,
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
                    {noDataFound == true && attendanceListData?.length == 0 && (
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

                    getAttendanceList(Helper.EmployeeID, startDate, date);
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


export default AttendanceScreen;
