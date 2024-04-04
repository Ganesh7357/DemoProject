import React, {useState, useEffect, useContext, useCallback} from 'react';
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
import {FontSize} from '../../lip/Fonts';
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

const AddEmployeeScreen = ({navigation}) => {
  const loaderContext = useContext(AppContext);
  const [isFocused, setIsFocused] = useState(false);
  const [empName, setempName] = useState('');
  const [empDesignation, setempDesignation] = useState('');
  const [empGender, setempGender] = useState('');
  const [empDob, setempDob] = useState(null);
  const [empPrimary, setempPrimary] = useState('');
  const [empEmail, setempEmail] = useState('');
  const [empResp, setempResp] = useState('');
  const [empQual, setempQual] = useState('');
  const [empPermaent, setPermanent] = useState('');
  const [localAddress, setlocalAddress] = useState('');
  const [empSalary, setempSalary] = useState('');
  const [empBlood, setempBlood] = useState('');
  const [empCS, setempCS] = useState('');
  const [empHigh, setempHigh] = useState('');
  const [empPhotoName, setempPhotoName] = useState('');
  const [empPhoto, setempPhoto] = useState('');
  const [check, setCheck] = useState(false);
  const [imageFormat, setimageFormat] = useState('');
  
  const [btnDisable, setbtnDisable] = useState(false);

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
    } catch (error) {}
  };





  const btnSubmitApi = async () => {
    try {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const mobileRegex = /^[0-9]{10}$/;

      if (empName == '') {
        Helper.showToast('Enter Employee Name');
      } else if (empGender == '') {
        Helper.showToast('Select Gender');
      } else if (empDob == null) {
        Helper.showToast('Select DOB');
      } else if (empPrimary == '') {
        Helper.showToast('Enter Primary Number');
      }else if (!mobileRegex.test(empPrimary)) {
        Helper.showToast('Invalid mobile number. Please enter a 10-digit number.');
      }
       else if (empEmail == '') {
        Helper.showToast('Enter Email');
      }else if (!reg.test(empEmail)) {
        Helper.showToast('Enter valid email');
        return false;
      } else {
    
        Keyboard.dismiss();
        setbtnDisable(true)
        NetInfo.fetch().then(state => {
          if (!state.isConnected) {
            Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
            return;
          } else {
            var formdata = new FormData();
            formdata.append('name', empName);
            formdata.append('gender', empGender);
            formdata.append('dob',  empDob == null ? '' : moment(empDob).format('DD-MM-YYYY'));
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

            if(empPhoto){
              formdata.append('image', {
                uri: empPhoto,
                type: imageFormat,
                name: empPhotoName,
              });
            }
           
            setbtnDisable(true)

            loaderContext.showLoader();

            Helper.makeRequest({
              url: ApiUrl.AddEmployees,
              method: 'POSTUPLOAD',
              data: formdata,
            })
              .then(response => {
                setbtnDisable(false)
                if (response.success == true) {
                
                 DeviceEventEmitter.emit('EmployeeListUpdate', true);
                 navigation.goBack();
                  Helper.showToast(response.message)
                  loaderContext.hideLoader();
                } else {
                  loaderContext.hideLoader();
                 
                  Helper.showToast(response.message);
                }
              })
              .catch(err => {
                setbtnDisable(false)
                loaderContext.hideLoader();
              });
          }
        });
      }
    } catch (error) {
      setbtnDisable(false)
      loaderContext.hideLoader();
    }
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
        title={'Add Employee'}
        rightIcon={ImagePath.Ic_notification}
        onClickrightIcon={() => {
          navigation.navigate('NotificationScreen');
        }}
      />
      <ScrollView style={styles.mainSpace} showsVerticalScrollIndicator={false}>
        {/* <TextInput
          placeholder="Employee ID"
          placeholderTextColor={Colors.textPlaceHolder}
          onChangeText={text => {
            setempId(text);
          }}
          value={empId}
          style={styles.textInput}></TextInput> */}

        <TextInput
          placeholder="Name"
          placeholderTextColor={Colors.textPlaceHolder}
          onChangeText={value => {
            setempName(value);
          }}
          value={empName}
          style={styles.textInput}></TextInput>

        {/* <TextInput
          placeholder="Designation"
          placeholderTextColor={Colors.textPlaceHolder}
          onChangeText={value => {
            setempDesignation(value);
          }}
          value={empDesignation}
          style={styles.textInput}></TextInput> */}

        {/* <TextInput
          placeholder="Gender"
          placeholderTextColor={Colors.textPlaceHolder}
          onChangeText={value => {
            setempGender(value);
          }}
          value={empGender}
          style={styles.textInput}></TextInput> */}

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
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
              
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

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setshowempDob(true);
          }}>
          
          <TextInput
            placeholder="DOB"
            placeholderTextColor={Colors.textPlaceHolder}
            onChangeText={value => {
              setempDob(value);
            }}
            value={empDob == null ? "Select DOB" : moment(empDob).format('DD-MM-YYYY')}
            editable={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.textInput}></TextInput>
          
        </TouchableOpacity>

        <View
          style={[
            styles.rowBox,
            {
              borderBottomWidth: 1,
              borderBottomColor: Colors.textPlaceHolder,
            },
          ]}>
          <TextInput
            placeholder="Primary Number"
            placeholderTextColor={Colors.textPlaceHolder}
            onChangeText={value => {
              setempPrimary(value);
            }}
            value={empPrimary}
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
          placeholder="Email"
          placeholderTextColor={Colors.textPlaceHolder}
          onChangeText={value => {
            setempEmail(value);
          }}
          value={empEmail}
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
            placeholder="Photo"
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

        <TextInput
          placeholder="Responsibilities"
          placeholderTextColor={Colors.textPlaceHolder}
          onChangeText={value => {
            setempResp(value);
          }}
          value={empResp}
          style={styles.textInput}></TextInput>

        <TextInput
          placeholder="Highest Qualification"
          placeholderTextColor={Colors.textPlaceHolder}
          onChangeText={value => {
            setempHigh(value);
          }}
          value={empHigh}
          style={styles.textInput}></TextInput>

        <TextInput
          placeholder="Comunication skill"
          onChangeText={value => {
            setempCS(value);
          }}
          value={empCS}
          placeholderTextColor={Colors.textPlaceHolder}
          style={styles.textInput}></TextInput>

        <TextInput
          placeholder="Blood Group"
          onChangeText={value => {
            setempBlood(value);
          }}
          value={empBlood}
          placeholderTextColor={Colors.textPlaceHolder}
          style={styles.textInput}></TextInput>

        <TextInput
          placeholder="Month Salary"
          onChangeText={value => {
            setempSalary(value);
          }}
          value={empSalary}
          keyboardType="numeric"
          placeholderTextColor={Colors.textPlaceHolder}
          style={styles.textInput}></TextInput>

        <TextInput
          placeholder="Local address"
          onChangeText={value => {
            setlocalAddress(value);
          }}
          value={localAddress}
          placeholderTextColor={Colors.textPlaceHolder}
          style={styles.textInput}></TextInput>

        <TextInput
          placeholder="Permanent address"
          onChangeText={value => {
            setPermanent(value);
          }}
          value={empPermaent}
          placeholderTextColor={Colors.textPlaceHolder}
          style={styles.textInput}></TextInput>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.btnStyle}
           disabled={btnDisable}
            onPress={() => {
              if(btnDisable == false){
                btnSubmitApi();
              }
             
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
        date={empDob == null ? new Date() : empDob}
        mode="date"
        title="Select DOB"
        onConfirm={date => {
          setshowempDob(false);
          setempDob(date);
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

export default AddEmployeeScreen;
