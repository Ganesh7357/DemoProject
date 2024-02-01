import React, { useEffect, useContext, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  useColorScheme,
} from 'react-native';
import ImagePath from '../Lip/ImagePath';
import navigationStrings from './navigationStrings';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Helper from '../Lip/Helper';

function SideDrawerTab(props) {
  const { onClick, label, img, menuSamIconCss, sameTextCSs, menuIconTextView } =
    props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        onClick();
      }}
      style={menuIconTextView}>
      <Image source={img} style={menuSamIconCss} />
      <Text
        style={[
          sameTextCSs,
          {
            left: 5,
            padding: 5,
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const CustomDrawerContent = ({ navigation }) => {
  const [displayName, setdisplayName] = useState('');
  const [userName, setUserName] = useState('');
  const [uploadAvatar, setuploadAvatar] = useState('');
  const [userType, setuserType] = useState('');
  const [appVersion, setappVersion] = useState('');
  const [empRole, setempRole] = useState([]);
  const [moreShow, setMoreShow] = useState(false);

  const logoutApi = () => {
    setTimeout(() => {
      Helper.removeItemValue('userdata');
      Helper.removeItemValue('token');
      Helper.removeItemValue('role');
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }, 500);
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainView}>
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
            }}
            style={styles.closeBtn}>
            <Image
              source={ImagePath.Ic_cancel}
              style={{
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

           {/* <View style={styles.imgCricle}>
            <View style={styles.mainImageCircle}>
              <Image
                style={styles.imageStyle}
                source={ImagePath.Ic_avatar}></Image>
            </View>
            <View style={styles.imgleft}>
              <Text
                style={[
                  styles.userNameTextCSs,
                ]}>
                Ganesh kumawat
              </Text>

              <Text
                style={[
                  styles.userNameTextCSs,
                ]}>
                Kumawatganesh718@gmail.com
              </Text>
            </View>
          </View>  */}
        </View>
        <View
          style={{
            marginHorizontal: wp(3),
            // marginVertical: hp(2),
          }}>
          <SideDrawerTab
            onClick={() => {
              navigation.closeDrawer();
              navigation.navigate(navigationStrings.PUNCHIN);
            }}
            label={'Punchin'}
            menuSamIconCss={styles.menuSamIconCss}
            sameTextCSs={styles.sameTextCSs}
            menuIconTextView={styles.menuIconTextView}
            // img={ImagePath.Ic_punchinout}
          />
          <SideDrawerTab
            onClick={() => {
              navigation.closeDrawer();
              navigation.navigate(navigationStrings.PROFILE);
            }}
            label={'Profile'}
            menuSamIconCss={styles.menuSamIconCss}
            sameTextCSs={styles.sameTextCSs}
            menuIconTextView={styles.menuIconTextView}
            // img={ImagePath.Ic_user}
          />
          <SideDrawerTab
            onClick={() => {
              navigation.closeDrawer();
              logoutApi();
            }}
            label={'Logout'}
            menuSamIconCss={styles.menuSamIconCss}
            sameTextCSs={styles.sameTextCSs}
            menuIconTextView={styles.menuIconTextView}
            // img={ImagePath.Ic_logout}
          />
          <SideDrawerTab
            onClick={() => {
              navigation.closeDrawer();
              navigation.navigate(navigationStrings.LEAVE_LIST_EMPLOYEE)
            }}
            label={'Leave'}
            menuSamIconCss={styles.menuSamIconCss}
            sameTextCSs={styles.sameTextCSs}
            menuIconTextView={styles.menuIconTextView}
            // img={ImagePath.Ic_logout}
          />
          <SideDrawerTab
            onClick={() => {
              navigation.closeDrawer();
              navigation.navigate(navigationStrings.TOTAL_LEAVES)
            }}
            label={'Total Leaves'}
            menuSamIconCss={styles.menuSamIconCss}
            sameTextCSs={styles.sameTextCSs}
            menuIconTextView={styles.menuIconTextView}
            // img={ImagePath.Ic_logout}
          />
          <SideDrawerTab
            onClick={() => {
              navigation.closeDrawer();
              navigation.navigate(navigationStrings.LOCATION_PERMISSION_SEREEN)
            }}
            label={'LOCATION PERMISSION'}
            menuSamIconCss={styles.menuSamIconCss}
            sameTextCSs={styles.sameTextCSs}
            menuIconTextView={styles.menuIconTextView}
            // img={ImagePath.Ic_logout}
          />
        </View>
      </ScrollView>
      <View style={styles.btnFab}>
        <Text style={styles.sameTextCSs}> V 1.0.0</Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    right: wp(5),
  },
  menuSamIconCss: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: '#333',
  },
  mainView: {
    flexDirection: 'column',
    // backgroundColor: '#ccc',
    paddingTop: hp(3),
  },
  imgCricle: {
    marginHorizontal: wp(3),
    flexDirection: 'row',
    flex: 1,
  },
  imgleft: {
    justifyContent: 'center',
    left: 10,
    flex: 1,
  },
  userNameTextCSs: {
    color: '#333',
    fontSize: 14,
  },
  mainImageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  sameTextCSs: {
    color:'#333',
    fontSize: 14,
    fontWeight: '700'
  },
  menuIconTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 5,
    marginVertical: hp(1),
  },
  btnFab: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center'
  }
});
