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
} from 'react-native';
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
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';

import Helper from '../../lip/Helper';
import Config from '../../lip/Config';
import NetInfo from '@react-native-community/netinfo';
import AlertMsg from '../../lip/AlertMsg';
import ApiUrl from '../../lip/ApiUrl';
import AppContext from '../../lip/AppContext';
import CameraController from '../../lip/CameraController';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const EditEmployeeScreen = ({ navigation, route }) => {
  const loaderContext = useContext(AppContext);

  const [empId, setempId] = useState('');
  const [empName, setempName] = useState(route?.params?.item?.name);
  const [empDesignation, setempDesignation] = useState(
    route?.params?.item?.designationId?.name,
  );

  const [empGender, setempGender] = useState(route?.params?.item?.gender);
  const [empDob, setempDob] = useState(route?.params?.item?.dob);
  const [empDob1, setempDob1] = useState(new Date());
  const [empPrimary, setempPrimary] = useState(route?.params?.item?.mobile);
  const [empEmail, setempEmail] = useState(route?.params?.item?.email);
  const [empResp, setempResp] = useState(route?.params?.item?.responsibilities);
  const [empQual, setempQual] = useState('');
  const [empPermaent, setPermanent] = useState(
    route?.params?.item?.permanentAddress,
  );
  const [localAddress, setlocalAddress] = useState(
    route?.params?.item?.address,
  );
  const [empSalary, setempSalary] = useState(
    route?.params?.item?.current_salary,
  );
  const [empBlood, setempBlood] = useState(route?.params?.item?.blood_group);
  const [empCS, setempCS] = useState(route?.params?.item?.communicationSkill);
  const [empHigh, setempHigh] = useState(
    route?.params?.item?.highest_qualification,
  );
  const [isFocused, setIsFocused] = useState(false);
  const [empPhotoName, setempPhotoName] = useState(
    route?.params?.item?.profile_pitcture,
  );
  const [empPhoto, setempPhoto] = useState(
    route?.params?.item?.profile_pitcture,
  );
  const [check, setCheck] = useState(false);
  const [imageFormat, setimageFormat] = useState('');

  const [showempDob, setshowempDob] = useState(false);





  const btnPress = () => {
    try {
      CameraController.open(res => {
        if (res.path) {
          var parts = res?.path?.split('/');
          var imageName = parts[parts.length - 1];

          setempPhotoName(imageName);
          setimageFormat(res?.mime);
          setempPhoto(res?.path);
        }
      });
    } catch (error) { }
  };

  const btnSubmitApi = async () => {
    try {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const mobileRegex = /^[0-9]{10}$/;
      if (empName == '') {
        Helper.showToast('Enter Employee Name');
      }
      else if (empGender == '') {
        Helper.showToast('Select Gender');
      } else if (empDob == '') {
        Helper.showToast('Select DOB');
      } else if (empPrimary == '') {
        Helper.showToast('Enter Primary Number');
      } else if (!mobileRegex.test(empPrimary)) {
        Helper.showToast('Invalid mobile number. Please enter a 10-digit number.');
      }
      else if (empEmail == '') {
        Helper.showToast('Enter Email');
      }
      else if (!reg.test(empEmail)) {
        Helper.showToast('Enter valid email');
        return false;
      }
      else {
        Keyboard.dismiss();
        NetInfo.fetch().then(state => {
          if (!state.isConnected) {
            Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
            return;
          } else {
            var formdata = new FormData();

            formdata.append('name', empName);
            //  formdata.append('designationId', '6572f7e48fe32b1c9ec2b192');
            formdata.append('gender', empGender);
            formdata.append('dob', moment(empDob1).format('DD-MM-YYYY'));
            formdata.append('mobile', empPrimary);
            formdata.append('alternative_number', '');
            formdata.append('isWhatsappNumber', check);
            formdata.append('emergencyNumber', '');

            formdata.append('email', empEmail);
            formdata.append('responsibilities', empResp);
            formdata.append('highest_qualification', empHigh);
            formdata.append('communicationSkill', empCS);
            formdata.append('address', localAddress);
            formdata.append('permanentAddress', empPermaent);
            formdata.append('blood_group', empBlood);
            formdata.append('current_salary', empSalary);

            if (imageFormat) {

              formdata.append('image', {
                uri: empPhoto,
                type: imageFormat,
                name: empPhotoName,
              });

            }

            loaderContext.showLoader();

            Helper.makeRequest({
              url: ApiUrl.EditEmployees + route?.params?.item?._id,
              method: 'POSTUPLOAD',
              data: formdata,
            })
              .then((response) => {

                if (response.success == true) {
                  DeviceEventEmitter.emit('EmployeeListUpdate', true);
                  navigation.goBack();
                  Helper.showToast(response.message);
                  loaderContext.hideLoader();
                } else {
                  loaderContext.hideLoader();
                  Helper.showToast(response.message);
                }
              })
              .catch(err => {
                loaderContext.hideLoader();
              });
          }
        });
      }
    } catch (error) { }
  };


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
        title={'Edit Employee'}
        rightIcon={ImagePath.Ic_notification}
        onClickrightIcon={() => {
          navigation.navigate('NotificationScreen');
        }}
      />
      <ScrollView style={styles.mainSpace} showsVerticalScrollIndicator={false}>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Name :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // // placeholder="Name"
              placeholderTextColor={Colors.textPlaceHolder}
              onChangeText={value => {
                setempName(value);
              }}
              value={empName}
              style={styles.textInput}></TextInput>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Select Gender :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <View
              style={[
                styles.textInput,
                {
                  paddingHorizontal: 0,
                },
              ]}>
              <RNPickerSelect
                onValueChange={value => {
                  setempGender(value);
                }}
                placeholder={{
                  label: 'Select Gender',
                  value: 'Select Gender',
                }}
                placeholderTextColor={Colors.textPlaceHolder}
                items={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },

                ]}
                value={empGender}
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
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'DOB :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setshowempDob(true);
              }}>
              {isFocused ? (
                <TextInput
                  // placeholder="DOB"
                  placeholderTextColor={Colors.textPlaceHolder}
                  onChangeText={value => {
                    setempDob1(value);
                  }}
                  value={isFocused ? moment(empDob1).format('DD-MM-YYYY') : ''}
                  editable={false}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={styles.textInput}></TextInput>
              ) : (
                <TextInput
                  // placeholder="DOB"
                  placeholderTextColor={Colors.textPlaceHolder}
                  onChangeText={value => {
                    setempDob(value);
                  }}
                  value={empDob}
                  editable={false}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={styles.textInput}></TextInput>
              )}

            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Primary Number :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <View
              style={[
                styles.rowBox,
              ]}>
              <TextInput
                // placeholder="Primary Number"
                placeholderTextColor={Colors.textPlaceHolder}
                onChangeText={value => {
                  setempPrimary(value);
                }}
                value={empPrimary.toString()}
                keyboardType='numeric'
                maxLength={10}
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
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Email :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // placeholder="Email"
              placeholderTextColor={Colors.textPlaceHolder}
              onChangeText={value => {
                setempEmail(value);
              }}
              value={empEmail}
              style={styles.textInput}></TextInput>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Photo :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <View
              style={[
                styles.rowBox,
                {
                  marginVertical:6
                }
              ]}>
              <Caption text={empPhotoName} style={[styles.titleStyle,
              {
                flex: 1,
                paddingHorizontal: 10,
              },]} />

              {/* <TextInput
                // placeholder="Photo"
                placeholderTextColor={Colors.textPlaceHolder}
                onChangeText={value => {
                  setempPhotoName(value);
                }}
                value={empPhotoName}
                editable={false}
                style={[
                  styles.textInput,
                  {
                    flex: 1,
                    paddingHorizontal: 10,
                  },
                ]}></TextInput> */}

              <TouchableOpacity
                style={styles.flxend}
                activeOpacity={0.9}
                onPress={() => {
                  btnPress();
                }}>
                <Text style={styles.addSelfiBtn}>CHOOSE FILE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Responsibilities :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // placeholder="Responsibilities"
              placeholderTextColor={Colors.textPlaceHolder}
              onChangeText={value => {
                setempResp(value);
              }}
              value={empResp}
              style={styles.textInput}></TextInput>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Highest Qualification :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // placeholder="Highest Qualification"
              placeholderTextColor={Colors.textPlaceHolder}
              onChangeText={value => {
                setempHigh(value);
              }}
              value={empHigh}
              style={styles.textInput}></TextInput>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Comunication skill :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // placeholder="Comunication skill"
              onChangeText={value => {
                setempCS(value);
              }}
              value={empCS}
              placeholderTextColor={Colors.textPlaceHolder}
              style={styles.textInput}></TextInput>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Blood Group :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // placeholder="Blood Group"
              onChangeText={value => {
                setempBlood(value);
              }}
              value={empBlood}
              placeholderTextColor={Colors.textPlaceHolder}
              style={styles.textInput}></TextInput>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Month Salary :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // placeholder="Month Salary"
              onChangeText={value => {
                setempSalary(value);
              }}
              value={empSalary}
              keyboardType='numeric'
              placeholderTextColor={Colors.textPlaceHolder}
              style={styles.textInput}></TextInput>
          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Local address :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // placeholder="Local address"
              onChangeText={value => {
                setlocalAddress(value);
              }}
              value={localAddress}
              placeholderTextColor={Colors.textPlaceHolder}
              style={styles.textInput}></TextInput>

          </View>
        </View>
        <View style={styles.dividerLine}></View>

        <View style={styles.topTabMainViewcss}>
          <View style={styles.view1}>
            <Caption text={'Permanent address :'} style={styles.titleStyle222} />
          </View>
          <View style={styles.view2}>
            <TextInput
              // placeholder="Permanent address"
              onChangeText={value => {
                setPermanent(value);
              }}
              value={empPermaent}
              placeholderTextColor={Colors.textPlaceHolder}
              style={styles.textInput}></TextInput>
          </View>
        </View>
        <View style={styles.dividerLine}></View>


        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => {
              btnSubmitApi();
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

      <DatePicker
        modal
        open={showempDob}
        date={empDob1}
        mode="date"
        title="Select DOB"
        onConfirm={date => {
          setshowempDob(false);
          setempDob1(date);
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
    alignItems: 'center',
    flex: 1,
    marginHorizontal: wp(-10)
  },
  addSelfiBtn: {
    borderColor: '#656565',
    borderWidth: 1,
    padding: 2,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    fontSize: FontSize.fontSize13,
    fontFamily: Fonts.RobotoRegular,
    paddingHorizontal: 6,
    color: Colors.BlackColor,
    // marginHorizontal:5
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.textPlaceHolder,
    fontFamily: Fonts.RobotoMedium,
    fontSize: FontSize.fontSize13,
    // height: 45,
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
  topTabMainViewcss: {
    // top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor:'#ccc',
    // borderWidth:1,
    // paddingHorizontal:5,
    // borderRadius:5
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
    left: wp(1),
  },
  dividerLine: {
    backgroundColor: Colors.textPlaceHolder,
    height: 1,
    marginVertical: hp(-0.3),
    // top: 20,
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

export default EditEmployeeScreen;
