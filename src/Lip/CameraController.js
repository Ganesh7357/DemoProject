import ImageCropPicker from 'react-native-image-crop-picker';
import { Platform } from 'react-native';
import Helper from './Helper';
import {
  check,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

export default class CameraController {
  static async open(cb, iscrop) {
    Helper.cameraAlert(
        'Select image from...',
        'Camera',
        'Gallery',
        'Cancel',
        statusCamera => {
            if (statusCamera) {
                CameraController.checkPremission(
                    PERMISSIONS.ANDROID.CAMERA,
                    PERMISSIONS.IOS.CAMERA,
                    cb,
                    'Camera',
                    iscrop,
                );
            }
        },
        statusGallery => {
            // Call getVersion here and pass necessary arguments
            this.getVersion(statusGallery, cb, iscrop);
        }
    );
}

static getVersion(statusGallery, cb, iscrop) {
    const OsVer = Platform.constants['Release'];

    if (statusGallery) {
        if (parseInt(OsVer) >= 13) {
            CameraController.checkPremission(
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                PERMISSIONS.IOS.PHOTO_LIBRARY,
                cb,
                'Gallery',
                iscrop,
            );
        } else {
            CameraController.checkPremission(
                PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                PERMISSIONS.IOS.PHOTO_LIBRARY,
                cb,
                'Gallery',
                iscrop,
            );
        }
    }
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

      }
    });
  });
};

  static selecteImage(cb, launchType, iscrop) {
  if (launchType == 'Camera') {
    if (iscrop) {
      ImageCropPicker.openCamera({

        cropping: true,
        // cropperCircleOverlay: true,

        freeStyleCropEnabled: true,
      }).then(image => {
        cb(image);
      });
    } else {
      ImageCropPicker.openCamera({
        cropping: true,
        // cropperCircleOverlay: true,

        freeStyleCropEnabled: true,
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
