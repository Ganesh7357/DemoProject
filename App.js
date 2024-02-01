//import liraries
import React, { useEffect,useState } from 'react';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import LoginScreen from './src/Screen/LoginScreen/LoginScreen'
import 'react-native-gesture-handler';
LogBox.ignoreAllLogs(true);
import { NavigationContainer } from '@react-navigation/native';
import PunchinScreen from './src/Screen/BottomScreen/PunchinScreen';
import Routes from './src/Navigation/Routes';
const App = () => {
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const locationStatus = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      }),
    );
    console.log('locationStatus============>',locationStatus)
    setLocationPermission(locationStatus);
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle="light-content" backgroundColor={'#333'} />
      <Routes />
    </SafeAreaView> 
  );
};


export default App;
