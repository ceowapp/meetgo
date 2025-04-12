import React from 'react';
import LoginScreen from 'scenes/auth/screens/LoginScreen';
import OnboardingScreen from 'scenes/auth/screens/OnBoarding';
import {AppStack, STACK_NAVIGATOR} from './types';

function AuthNavigator(): React.ReactElement {
  return (
    <>
      <AppStack.Screen
        name={STACK_NAVIGATOR.AUTH_NAVIGATOR}
        key={STACK_NAVIGATOR.AUTH_NAVIGATOR}
        component={LoginScreen}
      />
      <AppStack.Screen
        name={STACK_NAVIGATOR.AUTHEN_ONBOARD}
        key={STACK_NAVIGATOR.AUTHEN_ONBOARD}
        component={OnboardingScreen}
      />
    </>
  );
}
export default AuthNavigator;
