//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import ImagePath from '../lip/ImagePath';
import Colors from '../lip/Colors';
import { FontSize } from '../lip/Fonts';
import Fonts from '../lip/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HomeScreen from '../Screen/BottomScreen/HomeScreen';
import ProfileScreen from '../Screen/BottomScreen/ProfileScreen';
import PunchinScreen from '../Screen/BottomScreen/PunchinScreen'
import ProjectScreen from '../Screen/BottomScreen/ProjectScreen';
import LeadsScreen from '../Screen/BottomScreen/LeadsScreen';
import TeamScreen from '../Screen/BottomScreen/TeamScreen';
import QuickLeadScreen from '../Screen/BottomScreen/QuickLeadScreen';

const RenderTabIcon = props => {
  const {
    activeIcon,
    inActiveIcon,
    label,
    label1,
    isFocused,
    titleTheme,
    titleTheme2,
    notificationcount
  } = props;
  return (
    <View
      style={{
        backgroundColor: isFocused ? Colors.ThemeColor : Colors.White,

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        width: '100%',
      }}>
      <Image
        source={isFocused ? activeIcon : inActiveIcon}
        style={{
          width: 18,
          height: 18,
          resizeMode: 'contain',
          tintColor: isFocused ? Colors.White : Colors.doveGray,
        }}
      />
      {isFocused ? (
        <>
          {label == 'Leads' || label == 'Project' ? (
            <>
              {notificationcount > 0 && (
                <View
                  style={{
                    backgroundColor: 'red',
                    position: 'absolute',

                    borderRadius: 10, // Adjusted border radius for a perfect circle
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 8,
                    right: 8,
                    width: 30
                  }}>
                  <Text style={titleTheme}>{notificationcount > 10 ? "10+" : notificationcount}</Text>
                </View>
              )}
              <Text style={titleTheme}>{label}</Text>
            </>
          ) : (
            <Text style={titleTheme}>{label}</Text>
          )}
        </>
      ) : (
        <>
          {label == 'Leads' || label == 'Project' ? (
            <>
              {notificationcount > 0 && (
                <View
                  style={{
                    backgroundColor: 'red',
                    position: 'absolute',

                    borderRadius: 10, // Adjusted border radius for a perfect circle
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 8,
                    right: 8,
                    width: 30
                  }}>
                  <Text style={titleTheme}>{notificationcount > 10 ? "10+" : notificationcount}</Text>
                </View>
              )}
              <Text style={titleTheme2}>{label}</Text>
            </>
          ) : (
            <Text style={titleTheme2}>{label}</Text>
          )}
        </>
      )}
    </View>
  );
};
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: Colors.White,
        height: hp(7),
      },
      headerShown: false,
      tabBarHideOnKeyboard: true,
      lazy: true,
    }}>
     
      <Tab.Screen name="HOME"
        component={HomeScreenStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <RenderTabIcon
                isFocused={focused}
                activeIcon={ImagePath.Ic_dashboard}
                inActiveIcon={ImagePath.Ic_dashboard}
                label={'Home'}
                //  label1={'Home'}
                titleTheme={styles.label1TextCss}
                titleTheme2={styles.labelTextCss}
              />
            );
          },
        }}
      />
       <Tab.Screen name="LEADS"
        component={LeadsScreenStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <RenderTabIcon
                isFocused={focused}
                activeIcon={ImagePath.Ic_leads}
                inActiveIcon={ImagePath.Ic_leads}
                label={'Leads'}
                //label1={'Punch'}
                titleTheme={styles.label1TextCss}
                titleTheme2={styles.labelTextCss}
              />
            );
          },
        }}
      />
       <Tab.Screen name="PROJECT"
        component={ProjectScreenStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <RenderTabIcon
                isFocused={focused}
                activeIcon={ImagePath.Ic_project}
                inActiveIcon={ImagePath.Ic_project}
                label={'Project'}
                //label1={'Punch'}
                titleTheme={styles.label1TextCss}
                titleTheme2={styles.labelTextCss}
              />
            );
          },
        }}
      />
       <Tab.Screen name="TEAM"
        component={TeamScreenStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <RenderTabIcon
                isFocused={focused}
                activeIcon={ImagePath.Ic_teams}
                inActiveIcon={ImagePath.Ic_teams}
                label={'Team'}
                //label1={'Punch'}
                titleTheme={styles.label1TextCss}
                titleTheme2={styles.labelTextCss}
              />
            );
          },
        }}
      />
       {/* <Tab.Screen name="PUNCIN"
        component={PunchinScreenStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <RenderTabIcon
                isFocused={focused}
                activeIcon={ImagePath.Ic_punchinout}
                inActiveIcon={ImagePath.Ic_punchinout}
                label={'Punch'}
                //label1={'Punch'}
                titleTheme={styles.label1TextCss}
                titleTheme2={styles.labelTextCss}
              />
            );
          },
        }}
      /> */}
      <Tab.Screen name="PROFILE"
        component={ProfileScreenStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <RenderTabIcon
                isFocused={focused}
                activeIcon={ImagePath.Ic_profile}
                inActiveIcon={ImagePath.Ic_profile}
                label={'Profile'}
                // label1={'Profile'}
                titleTheme={styles.label1TextCss}
                titleTheme2={styles.labelTextCss}
              />
            );
          },
        }} />
    </Tab.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeScreenStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} 
       options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} />
    </HomeStack.Navigator>
  );
}
const ProfileStack = createStackNavigator();

function ProfileScreenStack() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} 
       options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} />
    </ProfileStack.Navigator>
  );
}

const PunchinStack = createStackNavigator();

function PunchinScreenStack() {
  return (
    <PunchinStack.Navigator>
      <PunchinStack.Screen name="PunchinScreen" component={PunchinScreen} 
       options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}/>
    </PunchinStack.Navigator>
  );
}

const ProjectStack = createStackNavigator();

function ProjectScreenStack() {
  return (
    <ProjectStack.Navigator>
      <ProjectStack.Screen name="ProjectScreen" component={ProjectScreen} 
      options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} />
    </ProjectStack.Navigator>
  );
}
const LeadsStack = createStackNavigator();

function LeadsScreenStack() {
  return (
    <LeadsStack.Navigator>
      <LeadsStack.Screen name="LeadsScreen" component={LeadsScreen}  
      options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} />
    </LeadsStack.Navigator>
  );
}
const TeamStack = createStackNavigator();

function TeamScreenStack() {
  return (
    <TeamStack.Navigator  screenOptions={{ headerShown: false }}>
      <TeamStack.Screen name="TeamScreen" component={TeamScreen}  
      options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} />
    </TeamStack.Navigator>
  );
}
const QuickLeadStack = createStackNavigator();

function QuickLeadScreenStack() {
  return (
    <QuickLeadStack.Navigator>
      <QuickLeadStack.Screen name="QuickLeadScreen" component={QuickLeadScreen} options={{ headerShown: false }} />
    </QuickLeadStack.Navigator>
  );
}




const styles = StyleSheet.create({
  labelTextCss: {
    color: Colors.doveGray,
    fontSize: FontSize.fontSize12,
    fontFamily: Fonts.NunitoMedium,
  },
  label1TextCss: {
    color: Colors.White,
    fontSize: FontSize.fontSize12,
    fontFamily: Fonts.NunitoMedium,
  },
});

export default BottomTab;
