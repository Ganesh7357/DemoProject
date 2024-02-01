import ImageCropPicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import Helper from './Helper';
import {
  check,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

export default class CameraController {
  static async open(cb) {
    // Directly open the camera without showing the alert and without cropping
    CameraController.checkPremission(
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.IOS.CAMERA,
      cb,
      'Camera',
      false, // Set iscrop to false to disable cropping
    );
  }
  
  
  static checkPremission = async (
    androidType,
    iosType,
    cb,
    launchType,
    iscrop,
  ) => {
    await check(
      Platform.select({
        android: androidType,
        ios: iosType,
      }),
    ).then(result => {
      if (result === 'granted') {
        this.selecteImage(cb, launchType, iscrop);
        return;
      }
      if (result === 'blocked' || result === 'unavailable') {
        Helper.permissionConfirm(
          'Access to the camera has been prohibited; please enable it in the Settings app to continue.',
          status => {
            if (status) {
              openSettings().catch(() => {
                console.warn('cannot open settings');
              });
            }
          },
        );
        return;
      }
      request(
        Platform.select({
          android: androidType,
          ios: iosType,
        }),
      ).then(status => {
        if (status === 'granted') {
          this.selecteImage(cb, launchType, iscrop);
        } else {
          console.log('location permission denied');
        }
      });
    });
  };

  static selecteImage(cb, launchType, iscrop) {
    if (launchType == 'Camera') {
      if (iscrop) {
        ImageCropPicker.openCamera({
       
          cropping: false,
          // cropperCircleOverlay: true,
        
          freeStyleCropEnabled: false,
        }).then(image => {
          cb(image);
        });
      } else {
        ImageCropPicker.openCamera({
          cropping: false,
          // cropperCircleOverlay: true,
        
          freeStyleCropEnabled: false,
        }).then(image => {
          cb(image);
        });
      }
    }

    if (launchType == 'Gallery') {
      if (iscrop) {
        ImageCropPicker.openPicker({
        
          cropping: true,
          //cropperCircleOverlay: true,
        
          freeStyleCropEnabled: true,
        }).then(image => {
          cb(image);
        });
      } else {
        ImageCropPicker.openPicker({
          cropping: true,
          // cropperCircleOverlay: true,
         
          freeStyleCropEnabled: true,
        }).then(image => {
          cb(image);
        });
      }
    }
  }
}
