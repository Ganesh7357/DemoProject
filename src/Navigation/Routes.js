//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screen 
import BottomTab from './BottomTab'
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../Screen/Auth/LoginScreen';
import CustomDrawerContent from './CustomDrawerContent'
import SplashScreen from '../Screen/Auth/SplashScreen';
import LeaveListEmployee from '../Screen/Leave/LeaveListEmployee';
import LeaveAddScreen from '../Screen/Leave/LeaveAddScreen';
import TotalLeaves from '../Screen/Leave/TotalLeaves';
import AttendanceList from '../Screen/AttendanceManagement/AttendanceList';
import Colors from '../lip/Colors';
import AddEmployeeScreen from '../Screen/EmployeeDetails/AddEmployeeScreen';
import EmployeeDetailsScreen from '../Screen/EmployeeDetails/EmployeeDetailsScreen';
import EditEmployeeScreen from '../Screen/EmployeeDetails/EditEmployeeScreen';
// Buying Manager Screen
import BuyingManagerScreen from '../Screen/BuyingManager/BuyingManagerScreen';
import AddPropertyScreen from '../Screen/BuyingManager/AddPropertyScreen';
import InfoPropertyScreen from '../Screen/BuyingManager/InfoPropertyScreen';
import PrpertyDetailsScreen from '../Screen/BuyingManager/PropertyDetailsScreen';
import PaymentDetailsScreen from '../Screen/BuyingManager/PaymentDetailesScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: Colors.White,
                },
                swipeEnabled: false,
                drawerPosition: 'left',
                headerShown: false,
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={BottomTab} />
        </Drawer.Navigator>
    );
}

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false, gestureEnabled: false }}
                initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="MyDrawer" component={MyDrawer} options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} />
                <Stack.Screen name="LeaveListEmployee" component={LeaveListEmployee}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="LeaveAddScreen" component={LeaveAddScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="TotalLeaves" component={TotalLeaves}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="AttendanceList" component={AttendanceList}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="AddEmployeeScreen" component={AddEmployeeScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="EmployeeDetailsScreen" component={EmployeeDetailsScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="EditEmployeeScreen" component={EditEmployeeScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="InfoPropertyScreen" component={InfoPropertyScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="AddPropertyScreen" component={AddPropertyScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="BuyingManagerScreen" component={BuyingManagerScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="PrpertyDetailsScreen" component={PrpertyDetailsScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
                <Stack.Screen name="PaymentDetailsScreen" component={PaymentDetailsScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default Routes;
