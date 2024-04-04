import React from 'react';
import { View, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Colors from '../../lip/Colors';
import Fonts, { FontSize } from '../../lip/Fonts';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import DetailScreen from './DetailScreen';
import AttendanceScreen from './AttendanceScreen';
import AssignProjectScreen from './AssignprojectScreen';
import ActivitiesScreen from './ActivitiesScreen';
import SalaryhistoryScreen from './SalaryhistoryScreen';
import SummeryreportSreen from './SummeryreportScreen';

const DetailStack = createStackNavigator();
function DetailStackScreen() {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      />
    </DetailStack.Navigator>
  );
}

const AttendanceStack = createStackNavigator();
function AttendanceStackScreen() {
  return (
    <AttendanceStack.Navigator>
      <AttendanceStack.Screen
        name="AttendanceScreen"
        component={AttendanceScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      />
    </AttendanceStack.Navigator>
  );
}

const AssignProjectStake = createStackNavigator();
function AssignProjectStackScreen() {
  return (
    <AssignProjectStake.Navigator>
      <AssignProjectStake.Screen
        name="AssignProjectScreen"
        component={AssignProjectScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      />
    </AssignProjectStake.Navigator>
  );
}

const ActivitieStake = createStackNavigator();
function ActivitieStakeScreen() {
  return (
    <ActivitieStake.Navigator>
      <ActivitieStake.Screen
        name="ActivitiesScreen"
        component={ActivitiesScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      />
    </ActivitieStake.Navigator>
  );
}
const SalaryhistoryStake = createStackNavigator();
function SalaryhistoryStakeScreen() {
  return (
    <SalaryhistoryStake.Navigator>
      <SalaryhistoryStake.Screen
        name="SalaryhistoryScreen"
        component={SalaryhistoryScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      />
    </SalaryhistoryStake.Navigator>
  );
}
const SummeryreportStake = createStackNavigator();
function SummeryreportStakeScreen() {
  return (
    <SummeryreportStake.Navigator>
      <SummeryreportStake.Screen
        name="SummeryreportSreen"
        component={SummeryreportSreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      />
    </SummeryreportStake.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();
function EmployeeTopTabScreen() {
  return (
    <View style={{ backgroundColor: Colors.White, flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {
            textTransform: 'none',
            fontSize: FontSize.fontSize14,
            fontFamily: Fonts.RobotoMedium,
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#737373',
          tabBarIndicatorStyle: {
            backgroundColor: '#0076FF',
            height: 2,
          },
          tabBarPressColor: Colors.White,
          swipeEnabled: true,
          lazy: true,
        }}
        style={{ backgroundColor: Colors.White }}
        initialRouteName="Detail">

        <Tab.Screen name="Detail" component={DetailStackScreen} />
        <Tab.Screen name="Attendance" component={AttendanceStackScreen} />
        <Tab.Screen name="Assign Project" component={AssignProjectStackScreen} />
        <Tab.Screen name="Activities" component={ActivitieStakeScreen} />
        <Tab.Screen name="Summery Report" component={SummeryreportStakeScreen} />
        <Tab.Screen name="Salary History" component={SalaryhistoryStakeScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default EmployeeTopTabScreen;

const styles = StyleSheet.create({
  mainViewCss: {
    height: heightPercentageToDP(6),
    marginHorizontal: widthPercentageToDP(0),
    elevation: 0,
  },
});
