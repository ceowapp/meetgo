import React, {useEffect, useState} from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {STACK_NAVIGATOR} from './types';
import HomeScreens from 'scenes/home/screens/Home';
import LocationNFTScreens from 'scenes/locations/screens/LocationNFT';
import AccountScreens from 'scenes/account/screens/Account';
import {Image, View} from 'react-native';
import Images from 'utils/Images';
import MeetGoScreens from 'scenes/meets/screens/QrScan';
import {COLORS} from 'utils/styleGuide';
import BottomTabBar from './BottomTabBar';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

function customTabBar(props: BottomTabBarProps) {
  return (
    <BottomTabBar
      state={props.state}
      insets={props.insets}
      descriptors={props.descriptors}
      navigation={props.navigation}
    />
  );
}
export default function BottomTabNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: COLORS.bgBottomTab,
        },
      }}
      tabBar={customTabBar}>
      <Tab.Screen
        name={STACK_NAVIGATOR.BOTTOM_TAB.HOME}
        component={HomeScreens}
        options={{
          tabBarLabel: t('navigation.home'),
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={STACK_NAVIGATOR.BOTTOM_TAB.LOCATION_NFT}
        component={LocationNFTScreens}
        options={{
          headerShown: true,

          headerTitle: props => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text variant="titleLarge" style={{paddingRight: 4}}>
                {t('navigation.nearby_location')}
              </Text>
              <Image
                source={Images.global.logo}
                resizeMode="contain"
                style={{width: 24, height: 24}}
              />
            </View>
          ),
          tabBarLabel: t('navigation.location'),
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                name="map-marker-radius-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={STACK_NAVIGATOR.BOTTOM_TAB.MEET_SCAN}
        component={MeetGoScreens}
        options={{
          tabBarLabel: 'Meet Go',
          tabBarIcon: ({color, size}) => {
            return <Icon name="line-scan" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={STACK_NAVIGATOR.BOTTOM_TAB.ACCOUNT}
        component={AccountScreens}
        options={{
          tabBarLabel: t('navigation.account'),
          tabBarIcon: ({color, size}) => {
            return <Icon name="account" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
