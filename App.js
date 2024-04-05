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
import 'react-native-gesture-handler';
import Routes from './src/Navigation/Routes';
import Colors from './src/lip/Colors';
LogBox.ignoreAllLogs(true);

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
      <StatusBar barStyle="light-content" backgroundColor={Colors.ThemeColor} />
      <Routes />
    </SafeAreaView> 
  );
};


export default App;
