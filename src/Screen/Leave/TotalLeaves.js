//import liraries
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
import NetInfo from '@react-native-community/netinfo';

const TotalLeaves = () => {
    const [dataSummery, setdataSummery] = useState({});

    return (
        <View style={styles.container}>
        {/* <Text></Text> */}
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.profileBoxShadow}

            >
                <View style={styles.cardIn}>
                    <View style={styles['ml-15']}>
                        <Text style={styles.cardHeader}>Total Applicable Paid Leave</Text>
                    </View>
                    <View style={styles.btnStyle}>
                        <Text
                            style={{
                                paddingHorizontal: 15,
                                color: Colors.BlackColor,
                                fontSize: FontSize.fontSize13,
                                fontFamily: Fonts.RobotoMedium,
                            }}>
                            12
                            {dataSummery?.assignedLead}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.profileBoxShadow}>
                <View style={styles.cardIn}>
                    <View style={styles['ml-15']}>
                        <Text style={styles.cardHeader}>Total Paid Leave</Text>
                    </View>
                    <View style={styles.btnStyle}>
                        <Text
                            style={{
                                paddingHorizontal: 15,
                                color: Colors.BlackColor,
                                fontSize: FontSize.fontSize13,
                                fontFamily: Fonts.RobotoMedium,
                            }}>
                            12
                            {dataSummery?.assignedLead}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.profileBoxShadow}>
                <View style={styles.cardIn}>
                    <View style={styles['ml-15']}>
                        <Text style={styles.cardHeader}>Total UnPaid Leave</Text>
                    </View>
                    <View style={styles.btnStyle}>
                        <Text
                            style={{
                                paddingHorizontal: 15,
                                color: Colors.BlackColor,
                                fontSize: FontSize.fontSize13,
                                fontFamily: Fonts.RobotoMedium,
                            }}>
                            12
                            {dataSummery?.assignedLead}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.profileBoxShadow}>
                <View style={styles.cardIn}>
                    <View style={styles['ml-15']}>
                        <Text style={styles.cardHeader}>Max allowed per month Paid Leave</Text>
                    </View>
                    <View style={styles.btnStyle}>
                        <Text
                            style={{
                                paddingHorizontal: 15,
                                color: Colors.BlackColor,
                                fontSize: FontSize.fontSize13,
                                fontFamily: Fonts.RobotoMedium,
                            }}>
                            12
                            {dataSummery?.assignedLead}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

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

export default TotalLeaves;
