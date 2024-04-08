import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Keyboard,
    DeviceEventEmitter,
    ActivityIndicator
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _ from 'lodash';

import AppHeader from '../../component/AppHeader';
import Colors from '../../lip/Colors';
import ImagePath from '../../lip/ImagePath';
import Caption from '../../component/Caption';
import Fonts from '../../lip/Fonts';
import { FontSize } from '../../lip/Fonts';
import RNPickerSelect from 'react-native-picker-select';
import { validators } from '../../lip/validationFunctions';
import Helper from '../../lip/Helper';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';
import CameraController from '../../lip/CameraController';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import KeyboardScroll from '../../component/KeyboardScroll';

const PaymentDetailsScreen = ({navigation}) => {
    const [showempDob, setshowempDob] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const [paymentPaidBy, setPaymentPadiby] = useState('')
    const [dateSelect, setdateSelect] = useState(null)
    const[paymentMode,setPaymentMode]=useState('')
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <View style={styles.container}>
            <AppHeader
                leftIcon={ImagePath.Ic_back}
                onClickleftIcon={() => {
                    navigation.goBack();
                }}
                title={'Add Payment Details'}
                rightIcon={ImagePath.Ic_notification}
                onClickrightIcon={() => {
                    // navigation.navigate('NotificationScreen');
                }}
            />
            <KeyboardScroll>
                <ScrollView style={styles.mainSpace} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setshowempDob(true);
                        }}>

                        <TextInput
                            placeholder="Document Receiving Date"
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setdateSelect(value);
                            }}
                            value={dateSelect == null ? "Document Receiving Date" : moment(dateSelect).format('DD-MM-YYYY')}
                            editable={false}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={styles.textInput}></TextInput>

                    </TouchableOpacity>
                    <TextInput
                        placeholder="Payment Paid By"
                        onChangeText={value => {
                            setPaymentPadiby(value);
                        }}
                        value={paymentPaidBy}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Payment Received By"
                        onChangeText={value => {
                            setPaymentPadiby(value);
                        }}
                        value={paymentPaidBy}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <View
                        style={[
                            styles.textInput,
                            {
                                paddingHorizontal: 0,
                            },
                        ]}>
                        <RNPickerSelect
                            onValueChange={value => {
                                setPaymentMode(value);
                            }}
                            placeholder={{
                                label: 'Select Mode of Payment',
                                value: 'Select Mode of Payment',
                            }}
                            placeholderTextColor={Colors.textPlaceHolder}
                            items={[
                                { label: 'Cheque', value: 'cheque' },
                                { label: 'Case', value: 'case' },
                                { label: 'NEFT', value: 'NEFT' },
                                { label: 'RTGS', value: 'RTGS' },
                                { label: 'UPI', value: 'UPI' },

                            ]}
                            value={paymentMode}
                            style={pickerStyle}
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
                    <TextInput
                        placeholder="Amount Paid"
                        onChangeText={value => {
                            setPaymentPadiby(value);
                        }}
                        value={paymentPaidBy}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>
                    <TextInput
                        placeholder="Blance Amount"
                        onChangeText={value => {
                            setPaymentPadiby(value);
                        }}
                        value={paymentPaidBy}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Remark/Note"
                        onChangeText={value => {
                            setPaymentPadiby(value);
                        }}
                        value={paymentPaidBy}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={[styles.textInput]}></TextInput>


                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.btnStyle}
                            // disabled={btnDisable}
                            onPress={() => {
                                // if (btnDisable == false) {
                                //     // btnSubmitApi();
                                // }

                            }}>
                            <Caption
                                text={'SUBMIT'}
                                style={{
                                    color: Colors.BlackColor,
                                    fontSize: FontSize.fontSize13,
                                    fontFamily: Fonts.RobotoMedium,
                                    textAlign: 'center',
                                }}
                            />


                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardScroll>
            <DatePicker
                modal
                open={showempDob}
                date={dateSelect == null ? new Date() : dateSelect}
                mode="date"
                title="Select Date"
                onConfirm={date => {
                    setshowempDob(false);
                    setdateSelect(date);
                    setIsFocused(true);
                }}
                onCancel={() => {
                    setshowempDob(false);
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
    marginView: {
        marginVertical: hp(1),
    },
    flxend: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
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
        color: Colors.BlackColor,
    },
    rowBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    btnStyle: {
        backgroundColor: Colors.Yellow,
        borderRadius: 5,
        marginHorizontal: 10,
        padding: hp(0.5),
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        paddingHorizontal: wp(8),
    },
    btnText: {
        color: Colors.BlackColor,
        fontSize: FontSize.fontSize14,
        fontFamily: Fonts.RobotoMedium,
        textAlign: 'center',
    },
    buttonView: {
        // position: 'absolute',
        marginVertical: hp(2),
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
        fontFamily: Fonts.RobotoRegular,
        height: 45,
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
        right: 12,
    },
});

//make this component available to the app
export default PaymentDetailsScreen;
