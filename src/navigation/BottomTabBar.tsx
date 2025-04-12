import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React, {FC, memo, useEffect, useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Platform from 'utils/Platform';

const BottomTabBar: FC<BottomTabBarProps> = ({
  state,
  insets,
  navigation,
  descriptors,
}) => {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      keyboardHidesNavigationBar={false}
      safeAreaInsets={insets}
      onTabPress={({route, preventDefault}) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({route, focused, color}) => {
        const {options} = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({focused, color, size: 24});
        }

        return null;
      }}
      getLabelText={({route}) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : (route && route?.title) || '';

        return label;
      }}
    />
  );
};
export default memo(BottomTabBar);
