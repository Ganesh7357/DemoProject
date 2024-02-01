//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import Helper from '../../Lip/Helper';

const LoginScreen = ({ navigation }) => {
    const [sheetHeight, setSheetHeight] = useState(55);
    const [otp, setValue] = useState('');
    const [timer, setTimer] = useState(30);
    const [isClosing, setIsClosing] = useState(false);
    const [modalverfication, setmodalverfication] = useState(false);
    const [phoneNo, setphoneNo] = useState('');
    const [verifyToken, setverifyToken] = useState('');
    const [isloading, setisloading] = useState(false);
    const [isRole, setisRole] = useState('');
    const [password, setPassword] = useState('');
    const [forgotType, setforgotType] = useState(false);
    const [email, setEmail] = useState('');
    const [btnShow, setbtnShow] = useState(false);
    const [btnCreatePassword, setbtnCreatePassword] = useState(false);
    const [passNew, setpassNew] = useState('');
    const [passNewConfirm, setpassNewConfirm] = useState('');

    const btnPhonenoVerify = async () => {
        try {
            if (phoneNo == '') {
                Helper.showToast('Enter phone no or emp.ID');
            } else {
                NetInfo.fetch().then(state => {
                    if (!state.isConnected) {
                        Helper.showToast('INTERNET_CONNECTION');
                        return;
                    } else {
                        var data = {
                            mobile: phoneNo,
                            deviceToken: Helper.device_token,
                            deviceId: Helper.device_id,
                            deviceType: Helper.device_type,
                        };

                        setisloading(true);
                        Helper.makeRequest({ url: 'auth/log-in', method: 'POST', data: data })
                            .then(response => {
                                if (response.success == true) {
                                    Helper.showToast(response.message);
                                    setverifyToken(response?.data?.verifyToken);
                                    setisRole(response?.data?.role)
                                    setmodalverfication(true);
                                    setisloading(false);
                                } else {
                                    Helper.showToast(response.message);
                                    setisloading(false);
                                }
                            })
                            .catch(err => {
                                setisloading(false);
                            });
                    }
                });
            }
        } catch (error) { }
    };

    const btnVerifyOtp = async () => {
        try {
            if (otp == '') {
                Helper.showToast('Please enter correct OTP');
            } else {
                if (otp.length === 4) {
                    Keyboard.dismiss();
                    NetInfo.fetch().then(state => {
                        if (!state.isConnected) {
                            Helper.showToast('INTERNET_CONNECTION');
                            return;
                        } else {
                            var data = {
                                mobile: phoneNo,
                                otp: otp,
                                resetToken: verifyToken,
                            };
                            setisloading(true);
                            Helper.makeRequest({
                                url: 'auth/verify-otp',
                                method: 'POST',
                                data: data,
                            })
                                .then(response => {
                                    if (response.success == true) {
                                        Helper.setData('token', response.data.jwt);
                                        Helper.setData('userdata', response.data.user);
                                        Helper.setData('role', response?.data?.user?.role);
                                        setmodalverfication(true);
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'MyDrawer' }],
                                        });
                                        setisloading(false);
                                    } else {
                                        Helper.showToast(response.message);
                                        setisloading(false);
                                    }
                                })
                                .catch(err => {
                                    setisloading(false);
                                });
                        }
                    });
                } else {
                    Helper.showToast('Please enter correct OTP');
                }
            }
        } catch (error) { }
    };

    const btnLoginVerify = async () => {
        try {
            if (password == '') {
                Helper.showToast('Please enter password');
            } else {

                Keyboard.dismiss();
                NetInfo.fetch().then(state => {
                    if (!state.isConnected) {
                        Helper.showToast('INTERNET_CONNECTION');
                        return;
                    } else {
                        var data = {
                            mobile: phoneNo,
                            password: password,
                            resetToken: verifyToken,
                        };
                        setisloading(true);
                        Helper.makeRequest({
                            url: 'auth/verify-otp',
                            method: 'POST',
                            data: data,
                        })
                            .then(response => {
                                if (response.success == true) {
                                    Helper.setData('token', response.data.jwt);
                                    Helper.setData('userdata', response.data.user);
                                    Helper.setData('role', response?.data?.user?.role);
                                    setmodalverfication(true);

                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'MyDrawer' }],
                                    });
                                    setisloading(false);
                                } else {
                                    Helper.showToast(response.message);
                                    setisloading(false);
                                }
                            })
                            .catch(err => {
                                setisloading(false);
                            });
                    }
                });

            }
        } catch (error) { }

    }


    return (
        <View style={styles.container}>
            {modalverfication == false && (
                <>
                    <TextInput
                        placeholder="Enter your Number"
                        placeholderTextColor={'#aaa'}
                        editable={true}
                        keyboardType={'number-pad'}
                        value={phoneNo}
                        maxLength={10}
                        onChangeText={text => {
                            setphoneNo(text);
                        }}
                        style={styles.textInput}></TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            btnPhonenoVerify();
                        }}
                        style={styles.btnRound}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </>
            )}
            {modalverfication === true && (
                <>
                    {phoneNo === '8686868643' ? (
                        <>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'#aaa'}
                                editable={true}
                                value={password}
                                onChangeText={text => {
                                    setPassword(text);
                                }}
                                style={styles.textInput}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    btnLoginVerify();
                                }}
                                style={styles.btnRound}
                            >
                                <Text style={styles.btnText}>Submit</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TextInput
                                placeholder="OTP"
                                placeholderTextColor={'#aaa'}
                                editable={true}
                                value={otp}
                                onChangeText={text => {
                                    setValue(text); // Change from setValue to setOtp
                                }}
                                style={styles.textInput}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    btnVerifyOtp();
                                }}
                                style={styles.btnRound}
                            >
                                <Text style={styles.btnText}>Submit</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </>
            )}

            {
                isloading && (
                    <View
                        style={{
                            position: 'absolute',
                            zIndex: 100,
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                        }}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color={'#fff'}
                            style={{ opacity: 1 }}
                        />
                    </View>
                )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        fontSize: 13,
        height: 45,
        color: '#333',
        fontWeight: '700',
        margin: 10,
        width: '50%',
        marginHorizontal: 20
    },
    btnText: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#333',
        fontWeight: '600'
    },
    btnRound: {
        backgroundColor: '#FFD229',
        marginVertical: hp(6),
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        width: 200

    },
});

export default LoginScreen;
