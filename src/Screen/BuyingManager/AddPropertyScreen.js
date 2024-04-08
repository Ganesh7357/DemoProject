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
// create a component
const AddPropertyScreen = ({ navigation }) => {
    const loaderContext = useContext(AppContext);
    const [isFocused, setIsFocused] = useState(false);

    const [partyName, setPartyName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [contact, setContact] = useState('')
    const [altContact, setAltContact] = useState('')
    const [mediatorName, setMediatorName] = useState('')
    const [medContact, setMedContact] = useState('')
    const [schemeName, setSchemeNmae] = useState('')
    const [schemeAdd, setSchemeAdd] = useState('')

    const [propertyTitle, setPropertyTitle] = useState('')
    const [lenght, setLenght] = useState('')
    const [width, setWidth] = useState('')
    const [totalArea, setTotalArea] = useState('')
    const [facing, setFacing] = useState('')
    const [road, setRoad] = useState('')
    const [rate, setRate] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [deal, setDeal] = useState('')
    const [dealPrice, setDealPrice] = useState('')
    const [remark, setRemark] = useState('')
    const [expSellingRate, setExpSellingRate] = useState('')
    const [expTotalSellingRate, setExpTotalSellingRate] = useState('')
    const [remark1, setRemark2] = useState('')

    const [documentReceDate, setDocumentReceDate] = useState(null)
    const [receiverAssociate, setReceiverAssociate] = useState('')
    const [docPhotoName, setDocPhotoName] = useState('')
    const [docImageFormat, setDocImageFormat] = useState('')
    const [docPhoto, setDocPhoto] = useState('')

    //
    const [check, setCheck] = useState(false);
    const [check1, setCheck1] = useState(false);

    const [btnDisable, setbtnDisable] = useState(false);
    const [showempDob, setshowempDob] = useState(false);

    const [showParty, setShowParty] = useState(true)
    const [showCompany, setShowCompany] = useState(false)

    const[checkBtn1,setCheckBtn1]=useState(false)
    const[checkBtn2,setCheckBtn2]=useState(false)

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    const btnPress = () => {
        try {
            CameraController.open(res => {
                if (res.path) {
                    var parts = res?.path?.split('/');
                    var imageName = parts[parts.length - 1];
                    setDocPhotoName(imageName);
                    setDocImageFormat(res?.mime);
                    setDocPhoto(res?.path);
                }
            });
        } catch (error) { }
    };

    return (
        <View style={styles.container}>
            <AppHeader
                leftIcon={ImagePath.Ic_back}
                onClickleftIcon={() => {
                    navigation.goBack();
                }}
                title={'Add Property'}
                rightIcon={ImagePath.Ic_notification}
                onClickrightIcon={() => {
                    // navigation.navigate('NotificationScreen');
                }}
            />
            <KeyboardScroll>
                <ScrollView style={styles.mainSpace} showsVerticalScrollIndicator={false}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 20
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowParty(true)
                                setShowCompany(false)
                                setCheckBtn1(true)
                                setCheckBtn2(false)

                            }}
                            style={{
                                borderRadius: 5,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                // backgroundColor: '#ddd',
                                flexDirection:'row'
                            }}>
                            <Image
                                source={
                                    checkBtn1 ? ImagePath.Ic_radioSelect : ImagePath.Ic_radioBtn
                                }
                                style={{
                                    tintColor: '#000',
                                    resizeMode: 'contain',
                                    height: 20,
                                    width: 20,
                                    marginHorizontal:5
                                }}></Image>
                            <Text>Individual </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setShowParty(false)
                                setShowCompany(true)
                                setCheckBtn2(true)
                                setCheckBtn1(false)
                            }}
                            style={{
                                borderRadius: 5,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                // backgroundColor: '#ddd'
                                flexDirection:'row'
                            }}>
                            <Image
                                source={
                                    checkBtn2 ? ImagePath.Ic_radioSelect : ImagePath.Ic_radioBtn
                                }
                                style={{
                                    tintColor: '#000',
                                    resizeMode: 'contain',
                                    height: 20,
                                    width: 20,
                                    marginHorizontal:5
                                }}></Image>
                            <Text>Project</Text>
                            </TouchableOpacity>
                    </View>
                    {showParty && (
                        <TextInput
                            placeholder="Party Name Mr./Mrs."
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setPartyName(value);
                            }}
                            value={partyName}
                            style={styles.textInput}></TextInput>
                    )}
                    {showCompany && (
                        <TextInput
                            placeholder="Company Name."
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setCompanyName(value);
                            }}
                            value={companyName}
                            style={styles.textInput}></TextInput>
                    )}
                    <View
                        style={[
                            styles.rowBox,
                            {
                                borderBottomWidth: 1,
                                borderBottomColor: Colors.textPlaceHolder,
                            },
                        ]}>
                        <TextInput
                            placeholder="Contact Number"
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setContact(value);
                            }}
                            value={contact}
                            maxLength={10}
                            keyboardType="numeric"
                            style={[
                                styles.textInput,
                                {
                                    flex: 1,
                                    borderBottomWidth: 0,
                                    borderBottomColor: Colors.textPlaceHolder,
                                    paddingHorizontal: 10,
                                },
                            ]}></TextInput>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={ImagePath.Ic_whatsapp}
                                style={{
                                    right: 5,
                                    resizeMode: 'contain',
                                }}></Image>
                            <TouchableOpacity
                                onPress={() => {
                                    setCheck1(!check1);
                                }}
                                activeOpacity={0.9}
                                style={{
                                    padding: 10,
                                }}>
                                <Image
                                    source={check1 ? ImagePath.Ic_checked : ImagePath.Ic_checkbox}
                                    style={{
                                        resizeMode: 'contain',
                                    }}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TextInput
                        placeholder="Alternate Contact Number"
                        placeholderTextColor={Colors.textPlaceHolder}
                        onChangeText={value => {
                            setAltContact(value);
                        }}
                        value={altContact}
                        keyboardType="numeric"
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Mediator Name"
                        placeholderTextColor={Colors.textPlaceHolder}
                        onChangeText={value => {
                            setMediatorName(value);
                        }}
                        value={mediatorName}
                        style={styles.textInput}></TextInput>

                    <View
                        style={[
                            styles.rowBox,
                            {
                                borderBottomWidth: 1,
                                borderBottomColor: Colors.textPlaceHolder,
                            },
                        ]}>
                        <TextInput
                            placeholder="Mediator Contact Number"
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setMedContact(value);
                            }}
                            value={medContact}
                            maxLength={10}
                            keyboardType="numeric"
                            style={[
                                styles.textInput,
                                {
                                    flex: 1,
                                    borderBottomWidth: 0,
                                    borderBottomColor: Colors.textPlaceHolder,
                                    paddingHorizontal: 10,
                                },
                            ]}></TextInput>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={ImagePath.Ic_whatsapp}
                                style={{
                                    right: 5,
                                    resizeMode: 'contain',
                                }}></Image>
                            <TouchableOpacity
                                onPress={() => {
                                    setCheck(!check);
                                }}
                                activeOpacity={0.9}
                                style={{
                                    padding: 10,
                                }}>
                                <Image
                                    source={check ? ImagePath.Ic_checked : ImagePath.Ic_checkbox}
                                    style={{
                                        resizeMode: 'contain',
                                    }}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <TextInput
                        placeholder="Scheme Name"
                        placeholderTextColor={Colors.textPlaceHolder}
                        onChangeText={value => {
                            setSchemeNmae(value);
                        }}
                        value={schemeName}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Scheme Address"
                        placeholderTextColor={Colors.textPlaceHolder}
                        onChangeText={value => {
                            setSchemeAdd(value);
                        }}
                        value={schemeAdd}
                        style={styles.textInput}></TextInput>

                    {/* <TextInput
                        placeholder="Property Title"
                        onChangeText={value => {
                            setPropertyTitle(value);
                        }}
                        value={propertyTitle}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <TextInput
                            placeholder="Lenght (in feet)"
                            onChangeText={value => {
                                setLenght(value);
                            }}
                            value={lenght}
                            placeholderTextColor={Colors.textPlaceHolder}
                            style={[styles.textInput, { width: wp(45) }]}></TextInput>
                        <TextInput
                            placeholder="Width (in feet)"
                            onChangeText={value => {
                                setWidth(value);
                            }}
                            value={width}
                            placeholderTextColor={Colors.textPlaceHolder}
                            style={[styles.textInput, { width: wp(45), marginLeft: hp(1) }]}></TextInput>
                    </View>
                    <TextInput
                        placeholder="Total Area (in Sq Yd)"
                        onChangeText={value => {
                            setTotalArea(value);
                        }}
                        value={totalArea}
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
                                setFacing(value);
                            }}
                            placeholder={{
                                label: 'Facing',
                                value: 'Facing',
                            }}
                            placeholderTextColor={Colors.textPlaceHolder}
                            items={[
                                { label: 'East', value: 'east' },
                                { label: 'West', value: 'west' },
                                { label: 'North', value: 'north' },
                                { label: 'South', value: 'south' },

                            ]}
                            value={facing}
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
                    <View
                        style={[
                            styles.textInput,
                            {
                                paddingHorizontal: 0,
                            },
                        ]}>
                        <RNPickerSelect
                            onValueChange={value => {
                                setRoad(value);
                            }}
                            placeholder={{
                                label: 'Road',
                                value: 'Road',
                            }}
                            placeholderTextColor={Colors.textPlaceHolder}
                            items={[
                                { label: '30Fit', value: '30fit' },
                                { label: '40Fit', value: '40fit' },
                                { label: '60Fit', value: '60fit' },
                                { label: '100fit', value: '100fit' },

                            ]}
                            value={road}
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
                        placeholder="Rate (in Rs/Sq Yd)"
                        onChangeText={value => {
                            setRate(value);
                        }}
                        value={rate}
                        // keyboardType="numeric"
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Total Amount (in Rs/Thousand/Lacs/Crore)"
                        onChangeText={value => {
                            setTotalAmount(value);
                        }}
                        value={totalAmount}
                        // keyboardType="numeric"
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <TextInput
                            placeholder="Deal"
                            onChangeText={value => {
                                setDeal(value);
                            }}
                            value={deal}
                            placeholderTextColor={Colors.textPlaceHolder}
                            style={[styles.textInput, { width: wp(45) }]}></TextInput>
                        <TextInput
                            placeholder="Deal Price"
                            onChangeText={value => {
                                setDealPrice(value);
                            }}
                            value={dealPrice}
                            placeholderTextColor={Colors.textPlaceHolder}
                            style={[styles.textInput, { width: wp(45), marginLeft: hp(1) }]}></TextInput>
                    </View>

                    <TextInput
                        placeholder="Remark"
                        onChangeText={value => {
                            setRemark(value);
                        }}
                        value={remark}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Expected Selling Rate (in Rs/Sq Yd)"
                        onChangeText={value => {
                            setExpSellingRate(value);
                        }}
                        value={expSellingRate}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Expected Total Selling Rate (in Rs/Sq Yd)"
                        onChangeText={value => {
                            setExpTotalSellingRate(value);
                        }}
                        value={expTotalSellingRate}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Remark"
                        onChangeText={value => {
                            setRemark2(value);
                        }}
                        value={remark1}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>


                    <View
                        style={[
                            styles.rowBox,
                            {
                                borderBottomWidth: 1,
                                borderBottomColor: Colors.textPlaceHolder,
                            },
                        ]}>
                        <TextInput
                            placeholder="Property Documents"
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setDocPhotoName(value);
                            }}
                            value={docPhotoName}
                            editable={false}
                            style={[
                                styles.textInput,
                                {
                                    flex: 1,
                                    borderBottomWidth: 0,
                                    borderBottomColor: Colors.textPlaceHolder,
                                    paddingHorizontal: 10,
                                },
                            ]}></TextInput>

                        <TouchableOpacity
                            style={styles.flxend}
                            activeOpacity={0.9}
                            onPress={() => {
                                btnPress();
                            }}>
                            <Text style={styles.addSelfiBtn}>CHOOSE FILE</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setshowempDob(true);
                        }}>

                        <TextInput
                            placeholder="Document Receiving Date"
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setDocumentReceDate(value);
                            }}
                            value={documentReceDate == null ? "Document Receiving Date" : moment(documentReceDate).format('DD-MM-YYYY')}
                            editable={false}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={styles.textInput}></TextInput>

                    </TouchableOpacity>
                    <TextInput
                        placeholder="Receiver Associate"
                        onChangeText={value => {
                            setReceiverAssociate(value);
                        }}
                        value={receiverAssociate}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput> */}

                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.btnStyle}
                            disabled={btnDisable}
                            onPress={() => {
                                navigation.navigate('PrpertyDetailsScreen');
                                if (btnDisable == false) {
                                    // btnSubmitApi();
                                }

                            }}>
                            <Caption
                                text={'NEXT'}
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
                date={documentReceDate == null ? new Date() : documentReceDate}
                mode="date"
                title="Document Receiving Date"
                onConfirm={date => {
                    setshowempDob(false);
                    setDocumentReceDate(date);
                    setIsFocused(true);
                }}
                onCancel={() => {
                    setshowempDob(false);
                }}
            />
        </View>
    );
};

const ProprtyDetails = ({ navigation }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showempDob, setshowempDob] = useState(false);

    const [propertyTitle, setPropertyTitle] = useState('')
    const [lenght, setLenght] = useState('')
    const [width, setWidth] = useState('')
    const [totalArea, setTotalArea] = useState('')
    const [facing, setFacing] = useState('')
    const [road, setRoad] = useState('')
    const [rate, setRate] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [deal, setDeal] = useState('')
    const [dealPrice, setDealPrice] = useState('')
    const [remark, setRemark] = useState('')
    const [expSellingRate, setExpSellingRate] = useState('')
    const [expTotalSellingRate, setExpTotalSellingRate] = useState('')
    const [remark1, setRemark2] = useState('')

    const [documentReceDate, setDocumentReceDate] = useState(null)
    const [receiverAssociate, setReceiverAssociate] = useState('')
    const [docPhotoName, setDocPhotoName] = useState('')
    const [docImageFormat, setDocImageFormat] = useState('')
    const [docPhoto, setDocPhoto] = useState('')

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    const btnPress = () => {
        try {
            CameraController.open(res => {
                if (res.path) {
                    var parts = res?.path?.split('/');
                    var imageName = parts[parts.length - 1];
                    setDocPhotoName(imageName);
                    setDocImageFormat(res?.mime);
                    setDocPhoto(res?.path);
                }
            });
        } catch (error) { }
    };
    return (
        <View style={styles.container}>
            <AppHeader
                leftIcon={ImagePath.Ic_back}
                onClickleftIcon={() => {
                    navigation.goBack();
                }}
                title={'Add Property'}
                rightIcon={ImagePath.Ic_notification}
                onClickrightIcon={() => {
                    // navigation.navigate('NotificationScreen');
                }}
            />
            <KeyboardScroll>
                <ScrollView style={styles.mainSpace} showsVerticalScrollIndicator={false}>
                    <TextInput
                        placeholder="Property Title"
                        onChangeText={value => {
                            setPropertyTitle(value);
                        }}
                        value={propertyTitle}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <TextInput
                            placeholder="Lenght (in feet)"
                            onChangeText={value => {
                                setLenght(value);
                            }}
                            value={lenght}
                            placeholderTextColor={Colors.textPlaceHolder}
                            style={[styles.textInput, { width: wp(45) }]}></TextInput>
                        <TextInput
                            placeholder="Width (in feet)"
                            onChangeText={value => {
                                setWidth(value);
                            }}
                            value={width}
                            placeholderTextColor={Colors.textPlaceHolder}
                            style={[styles.textInput, { width: wp(45), marginLeft: hp(1) }]}></TextInput>
                    </View>
                    <TextInput
                        placeholder="Total Area (in Sq Yd)"
                        onChangeText={value => {
                            setTotalArea(value);
                        }}
                        value={totalArea}
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
                                setFacing(value);
                            }}
                            placeholder={{
                                label: 'Facing',
                                value: 'Facing',
                            }}
                            placeholderTextColor={Colors.textPlaceHolder}
                            items={[
                                { label: 'East', value: 'east' },
                                { label: 'West', value: 'west' },
                                { label: 'North', value: 'north' },
                                { label: 'South', value: 'south' },

                            ]}
                            value={facing}
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
                    <View
                        style={[
                            styles.textInput,
                            {
                                paddingHorizontal: 0,
                            },
                        ]}>
                        <RNPickerSelect
                            onValueChange={value => {
                                setRoad(value);
                            }}
                            placeholder={{
                                label: 'Road',
                                value: 'Road',
                            }}
                            placeholderTextColor={Colors.textPlaceHolder}
                            items={[
                                { label: '30Fit', value: '30fit' },
                                { label: '40Fit', value: '40fit' },
                                { label: '60Fit', value: '60fit' },
                                { label: '100fit', value: '100fit' },

                            ]}
                            value={road}
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
                        placeholder="Rate (in Rs/Sq Yd)"
                        onChangeText={value => {
                            setRate(value);
                        }}
                        value={rate}
                        // keyboardType="numeric"
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Total Amount (in Rs/Thousand/Lacs/Crore)"
                        onChangeText={value => {
                            setTotalAmount(value);
                        }}
                        value={totalAmount}
                        // keyboardType="numeric"
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <TextInput
                            placeholder="Deal"
                            onChangeText={value => {
                                setDeal(value);
                            }}
                            value={deal}
                            placeholderTextColor={Colors.textPlaceHolder}
                            style={[styles.textInput, { width: wp(45) }]}></TextInput>
                        <TextInput
                            placeholder="Deal Price"
                            onChangeText={value => {
                                setDealPrice(value);
                            }}
                            value={dealPrice}
                            placeholderTextColor={Colors.textPlaceHolder}
                            style={[styles.textInput, { width: wp(45), marginLeft: hp(1) }]}></TextInput>
                    </View>

                    <TextInput
                        placeholder="Remark"
                        onChangeText={value => {
                            setRemark(value);
                        }}
                        value={remark}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Expected Selling Rate (in Rs/Sq Yd)"
                        onChangeText={value => {
                            setExpSellingRate(value);
                        }}
                        value={expSellingRate}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Expected Total Selling Rate (in Rs/Sq Yd)"
                        onChangeText={value => {
                            setExpTotalSellingRate(value);
                        }}
                        value={expTotalSellingRate}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <TextInput
                        placeholder="Remark"
                        onChangeText={value => {
                            setRemark2(value);
                        }}
                        value={remark1}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>


                    <View
                        style={[
                            styles.rowBox,
                            {
                                borderBottomWidth: 1,
                                borderBottomColor: Colors.textPlaceHolder,
                            },
                        ]}>
                        <TextInput
                            placeholder="Property Documents"
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setDocPhotoName(value);
                            }}
                            value={docPhotoName}
                            editable={false}
                            style={[
                                styles.textInput,
                                {
                                    flex: 1,
                                    borderBottomWidth: 0,
                                    borderBottomColor: Colors.textPlaceHolder,
                                    paddingHorizontal: 10,
                                },
                            ]}></TextInput>

                        <TouchableOpacity
                            style={styles.flxend}
                            activeOpacity={0.9}
                            onPress={() => {
                                btnPress();
                            }}>
                            <Text style={styles.addSelfiBtn}>CHOOSE FILE</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <TextInput
                        placeholder="Document Receiving Date"
                        onChangeText={value => {
                            setPermanent(value);
                        }}
                        value={empPermaent}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput> */}

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setshowempDob(true);
                        }}>

                        <TextInput
                            placeholder="Document Receiving Date"
                            placeholderTextColor={Colors.textPlaceHolder}
                            onChangeText={value => {
                                setDocumentReceDate(value);
                            }}
                            value={documentReceDate == null ? "Document Receiving Date" : moment(documentReceDate).format('DD-MM-YYYY')}
                            editable={false}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={styles.textInput}></TextInput>

                    </TouchableOpacity>
                    <TextInput
                        placeholder="Receiver Associate"
                        onChangeText={value => {
                            setReceiverAssociate(value);
                        }}
                        value={receiverAssociate}
                        placeholderTextColor={Colors.textPlaceHolder}
                        style={styles.textInput}></TextInput>

                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.btnStyle}
                            // disabled={btnDisable}
                            onPress={() => {
                                navigation.navigate('PrpertyDetailsScreen');
                                // if (btnDisable == false) {
                                //     // btnSubmitApi();
                                // }
                                console.log('========')
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
                date={documentReceDate == null ? new Date() : documentReceDate}
                mode="date"
                title="Document Receiving Date"
                onConfirm={date => {
                    setshowempDob(false);
                    setDocumentReceDate(date);
                    setIsFocused(true);
                }}
                onCancel={() => {
                    setshowempDob(false);
                }}
            />
        </View>
    );
}

// const paymentDetails = ({navigation})=>{
//     return(

//     )
// }

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
        // marginVertical:5
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

export default AddPropertyScreen;