import * as React from 'react';
import {Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Config from '../Config';
import DeviceInfo from 'react-native-device-info';

export default class Helper extends React.Component {
  static device_type = Platform.OS == 'android' ? 'Android' : 'IOS';
  static device_token = '';
  static device_id = DeviceInfo.getDeviceId();
  static location = '';
  static selectedSchoolCode = '';
  static selectedSchoolName = '';
  static driverSchoolID = '';
  static LeadID = ''
  static LeadDetails = ''
  static LeadType = ""

  static showToast(msg) {
    Toast.show(msg, Toast.BOTTOM);
  }

  static confirmPopUp(alertMessage, cb) {
    Alert.alert(
      Config.app_name,
      alertMessage,
      [
        {
          text: 'YES',
          onPress: () => {
            if (cb) cb(true);
          
          },
        },
        {
          text: 'NO',
          onPress: () => {
            if (cb) cb(false);
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  static permissionConfirm(alertMessage, cb) {
    Alert.alert(
      Config.app_name,
      alertMessage,
      [
        {
          text: 'NOT NOW',
          onPress: () => {
            if (cb) cb(false);
          },
          style: 'cancel',
        },
        {
          text: 'SETTINGS',
          onPress: () => {
            if (cb) cb(true);
          
          },
        },
      ],
      {cancelable: false},
    );
  }

  static cameraAlert(
    alertMessage,
    Camera,
    Gallery,
    Cancel,
    cbCamera,
    cbGallery,
  ) {
    Alert.alert(
      Config.app_name,
      alertMessage,
      [
        {
          text: Camera,
          onPress: () => {
            if (cbCamera) cbCamera(true);
           
          },
        },
        // {
        //   text: Gallery,
        //   onPress: () => {
        //     if (cbGallery) cbGallery(true);
           
        //   },
        // },
        {
          text: Cancel,
          onPress: () => {
            if (cbCamera) cbCamera(false);
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  static async setData(key, val) {
    try {
      let tempval = JSON.stringify(val);
      await AsyncStorage.setItem(key, tempval);
    } catch (error) {
      console.error(error, '----------SetAsyncStorage');
    }
  }

  static async getData(key) {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value) {
        let newvalue = JSON.parse(value);
        return newvalue;
      } else {
        return value;
      }
    } catch (error) {
      console.error(error, '---------GetAsyncStorage');
    }
  }

  static async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  static async makeRequest({url, data, method}) {
    let finalUrl = Config.baseurl + url;
    console.log(finalUrl, '________finalUrl');
    console.log(data, 'data');
    console.log(method, 'method');
    let form;
    let methodnew;
    let token = await this.getData('token');
    console.log(token, '++++++++++++tokentoken');

    let varheaders;
    if (method == 'POSTUPLOAD') {
      methodnew = 'POST';
      varheaders = {
        // Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: token
      };
      form = data;
    } else if (method == 'POST') {
      methodnew = 'POST';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        };
      } else {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
      }
      form = JSON.stringify(data);
    } 
    else if (method == 'DELETE') {
      methodnew = 'DELETE';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        };
      } else {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
      }
    } 
    else {
      methodnew = 'GET';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        };
      } else {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
      }
    }

    console.log('varheaders=', varheaders);
    console.log('form', form);
    console.log('methodnewmethodnew', methodnew);
    return fetch(finalUrl, {
      body: form,
      method: methodnew,
      headers: varheaders,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch((error, a) => {
        console.log('errorerror', error);
      });
  }
}
