//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screen 
import BottomTab from './BottomTab'
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../Screen/LoginScreen/LoginScreen';
import CustomDrawerContent from './CustomDrawerContent'
import SplashScreen from '../Screen/LoginScreen/SplashScreen';
import LeaveListEmployee from '../Screen/Leave/LeaveListEmployee';
import LeaveAddScreen from '../Screen/Leave/LeaveAddScreen';
import TotalLeaves from '../Screen/Leave/TotalLeaves';
import LocationPermissionScreen from '../Screen/LocationPermissionScreen';
const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' >
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="LeaveListEmployee" component={LeaveListEmployee} options={{ headerShown: true }} />
                <Stack.Screen name="LeaveAddScreen" component={LeaveAddScreen} options={{ headerShown: true }} />
                <Stack.Screen name="TotalLeaves" component={TotalLeaves} options={{ headerShown: true }} />
                <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={BottomTab} />
        </Drawer.Navigator>
    );
}


export default Routes;
