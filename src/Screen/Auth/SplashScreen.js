import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePath from '../../lip/ImagePath';
import Helper from '../../lip/Helper';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    Helper.getData('userdata').then(userdata => {
      if (userdata !== null) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MyDrawer' }],
          });
        }, 1500);
      } else {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        }, 1500);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default SplashScreen;
