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
    Modal
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../lip/Colors';
import Caption from '../../component/Caption';
import Fonts from '../../lip/Fonts';
import { FontSize } from '../../lip/Fonts';
import Helper from '../../lip/Helper';
import Config from '../../lip/Config';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';
import moment from 'moment';
// import ImageViewer from 'react-native-image-zoom-viewer';
import ImagePath from '../../lip/ImagePath';

const ActivitiesScreen = ({ navigation, route }) => {
    const loaderContext = useContext(AppContext);
    const [empActivity, setempActivity] = useState([]);
    const [currentUserType, setcurrentUserType] = useState('');
    const [currentUserID, setcurrentUserID] = useState('');

    const [SelectedImageUrl, setSelectedImageUrl] = useState([]);
    const [SelectedImageModal, setSelectedImageModal] = useState(false);
    const [noDataFound, setnoDataFound] = useState(false)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getEmployeeActivity();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getEmployeeActivity();
        Helper.getData('userdata').then(res => {
            setcurrentUserID(res._id);
        });
        Helper.getData('role').then(res => {
            setcurrentUserType(res);
        });
    }, []);
    const getUserID = async () => {
        return Helper.getData('userdata').then(res => {
            return res._id;
        });
    };
    const getEmployeeActivity = async () => {
        const userID = await getUserID();
        try {
            NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                    Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
                    return;
                } else {
                    loaderContext.showLoader();
                    Helper.makeRequest({
                        url: ApiUrl.EmployeeTimelineActivity + Helper.EmployeeID,
                        method: 'GET',
                    })
                        .then(response => {
                            if (response.success == true) {
                                setempActivity(response?.data?.timeline);
                                setnoDataFound(true)
                                Helper.showToast(response.message);
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
        } catch (error) { }
    };
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const showModelImages = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={SelectedImageModal}
                onBackdropPress={() => setSelectedImageModal(false)}
                onRequestClose={() => {
                    setSelectedImageModal(!SelectedImageModal);
                }}>
                <View style={styles.modalMainView}>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedImageModal(!SelectedImageModal);
                        }}
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            padding: 15,
                        }}>
                        <Image
                            source={ImagePath.Ic_cancel}
                            style={{
                                tintColor: '#fff',
                            }}></Image>
                    </TouchableOpacity>

                    {/* <ImageViewer
                        imageUrls={SelectedImageUrl}
                        renderIndicator={() => null}
                        useNativeDriver={true}
                    /> */}
                </View>
            </Modal>
        );
    };
    const renderData = ({ item, index }) => {
        let inMessage = item?.senderId?._id === currentUserID;
        let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
        return (
            <View style={[styles.item, itemStyle, {}]} key={index}>
                {/* {inMessage ? (
              <Image
                source={ImagePath.Ic_lefttail}
                style={{
                  right: 0,
                  bottom: 8,
                }}></Image>
            ) : (
              <Image
                source={ImagePath.Ic_righttail}
                style={{
                  right: 2,
                  position: 'absolute',
                  bottom: 75,
                }}></Image>
            )} */}

                <View style={[styles.balloon]}>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>
                        <Caption
                            text={capitalizeFirstLetter(item?.senderId?.name)}
                            style={{
                                color: Colors.BlackColor,
                                fontSize: FontSize.fontSize16,
                                fontFamily: Fonts.RobotoMedium,
                            }}
                        />

                        <Caption
                            text={item?.remark?.name}
                            style={{
                                color: Colors.BlackColor,
                                fontSize: FontSize.fontSize12,
                                fontFamily: Fonts.RobotoRegular,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            backgroundColor: '#B6B9BB',
                            height: 1,
                            top: 2,
                            marginVertical: hp(0.5),
                        }}
                    />
                    {item.LeadId?.name && (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                navigation.navigate('LeadDetailsScreen')
                                Helper.LeadID = item.LeadId?._id,
                                    Helper.LeadDetails = item.LeadId
                            }}>
                            <Caption
                                text={"Lead Name:- " + item.LeadId?.name}
                                style={{
                                    color: Colors.BlackColor,
                                    fontSize: FontSize.fontSize13,
                                    fontFamily: Fonts.RobotoMedium,
                                }}
                            />
                        </TouchableOpacity>

                    )}

                    <View
                        style={{
                            // justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginVertical: hp(0.5),

                            alignItems: 'center',
                        }}>
                        {item?.leadFile && (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    if (item?.leadFile) {
                                        setSelectedImageUrl([
                                            {
                                                url: Config.imageBaseUrl + item?.leadFile,
                                            },
                                        ]);
                                        setSelectedImageModal(true);
                                    }
                                }}>
                                <Image
                                    source={{ uri: Config.imageBaseUrl + item?.leadFile }}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 30,
                                        resizeMode: 'contain',
                                    }}></Image>
                            </TouchableOpacity>
                        )}
                        <Text
                            numberOfLines={5}
                            style={{
                                color: Colors.BlackColor,
                                fontSize: FontSize.fontSize16,
                                fontFamily: Fonts.RobotoRegular,
                                left: item?.leadFile ? 10 : 0,
                                flex: 1,
                            }}>
                            {item?.comment}
                        </Text>
                    </View>
                    <Text
                        style={{
                            color: Colors.BlackColor,
                            fontSize: FontSize.fontSize12,
                            fontFamily: Fonts.RobotoRegular,
                            textAlign: 'right',
                        }}>
                        {moment(item?.created).format('DD/MM/YYYY hh:mm a')}
                    </Text>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View
                style={{
                    paddingBottom: 120,
                }}>
                <Caption text={'Activities'} style={styles.btnHeader} />

                    <FlatList
                        style={styles.list}
                        data={empActivity}
                        bounces={false}
                        extraData={empActivity}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderData}
                    />
                   

                    {noDataFound == true && empActivity.length == 0 && (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',

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
                            No results found!
                        </Text>
                    </View>
                    )}
                {showModelImages()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
    },
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
export default ActivitiesScreen;
