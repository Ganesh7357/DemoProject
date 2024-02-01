//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/BottomScreen/HomeScreen';
import LoginScreen from '../Screen/LoginScreen/LoginScreen'
import ProfileScreen from '../Screen/BottomScreen/ProfileScreen';
import PunchinScreen from '../Screen/BottomScreen/PunchinScreen'

const Tab = createBottomTabNavigator();

function  BottomTab() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={HomeScreenStack}/>
      <Tab.Screen name="Punchin" component={PunchinScreenStack} />
      <Tab.Screen name="Profile" component={ProfileScreenStack} />
    </Tab.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeScreenStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
    </HomeStack.Navigator>
  );
}
const ProfileStack = createStackNavigator();

function ProfileScreenStack() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
    </ProfileStack.Navigator>
  );
}

const PunchinStack = createStackNavigator();

function PunchinScreenStack() {
  return (
    <PunchinStack.Navigator>
      <PunchinStack.Screen name="PunchinScreen" component={PunchinScreen} options={{headerShown:false}}/>
    </PunchinStack.Navigator>
  );
}


export default BottomTab;
