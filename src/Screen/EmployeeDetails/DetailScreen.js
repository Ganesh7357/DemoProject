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
  DeviceEventEmitter
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
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Helper from '../../lip/Helper';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';


const DetailScreen = ({ navigation, route }) => {
  const loaderContext = useContext(AppContext);
  const [empData, setempData] = useState({});
  const [currentUserID, setcurrentUserID] = useState('');
  const [currentUserType, setcurrentUserType] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDetails();
      // Refetch data when the tab is focused
    });

    // Cleanup the subscription when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getDetails();

    Helper.getData('userdata').then(res => {
      setcurrentUserID(res._id);
    });
    Helper.getData('role').then(res => {
      setcurrentUserType(res);
    });
  }, []);

  const getDetails = async () => {
    try {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return;
        } else {
          loaderContext.showLoader();
          Helper.makeRequest({
            url: ApiUrl.EmployeeDetailsScreen + Helper.EmployeeID,
            method: 'GET',
          })
            .then(response => {
              if (response.success == true) {
                setempData(response.data.employee);
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
    } catch (error) {
      loaderContext.hideLoader();
    }
  };
  return (
    <View style={styles.container}>
      {/* <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        behavior="padding"
        style={{
          marginBottom: hp(5),
        }}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}> */}
        <View style={styles.mainSpace}>
          <Caption text={'Employee Detail'} style={styles.btnHeader} />

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Employee ID :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.Employee_code} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Name :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.name} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Designation :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.designationId?.name} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Gender :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.gender} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'DOB :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.dob} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Primary Number :'} style={styles.titleStyle222} />
            </View>
            <View style={[styles.view2]}>
              <Caption text={empData?.mobile?.toString()} style={[styles.titleStyle, { right: -5 }]} />
            </View>
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
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Email :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.email} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Responsibilities :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.responsibilities} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Highest Qualification :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.highest_qualification} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Blood Group :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.blood_group} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Comunication skill :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.communicationSkill} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Month Salary :'} style={styles.titleStyle222} />
            </View>
            {empData?.current_salary && (
              <TouchableOpacity
                onPress={() => {
                  const Salary = empData?.current_salary
                  Helper.showToast(`Salary : ${Salary}`)
                }}
                activeOpacity={0.6}
                style={styles.view2}>
                <Caption text={'xxxxx'} style={styles.titleStyle} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Local addressc :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.address} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>

          <View style={styles.topTabMainViewcss}>
            <View style={styles.view1}>
              <Caption text={'Permanent addressc :'} style={styles.titleStyle222} />
            </View>
            <View style={styles.view2}>
              <Caption text={empData?.permanentAddress} style={styles.titleStyle} />
            </View>
          </View>
          <View style={styles.dividerLine}></View>
        </View>
      {/* </KeyboardAwareScrollView> */}
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
    top: 10,
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
    // left: 10,
  },
  rowBox: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  titleStyle: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoMedium,
    fontWeight: '500',
    textAlign: 'left',
  },
  titleStyle222: {
    color: Colors.BlackColor,
    fontSize: FontSize.fontSize12,
    fontFamily: Fonts.RobotoRegular,
    textAlign: 'justify',
  },
  view1: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  view2: {
    flex: 1,
    justifyContent: 'center',
    left: wp(2),
  },
  dividerLine: {
    backgroundColor: Colors.BColor,
    height: 1,
    marginVertical: hp(1.2),
    top: 10,
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
export default DetailScreen;
