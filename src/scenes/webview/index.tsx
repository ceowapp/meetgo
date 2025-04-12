import React, {useLayoutEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamList} from 'navigation/types';
import RnWebview from 'react-native-webview';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerWebview: {
    opacity: 0.99,
    overflow: 'hidden',
  },
});
const Webview = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AppStackParamList, 'WEB_VIEW'>>();
  const {title = '', url = ''} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, []);
  return (
    <RnWebview
      style={styles.containerWebview} // https://github.com/react-native-webview/react-native-webview/issues/811
      useWebView2
      javaScriptEnabled
      domStorageEnabled
      androidHardwareAccelerationDisabled
      source={{
        uri: url,
      }}
      scalesPageToFit
      viewportContent="width=device-width, user-scalable=no"
    />
  );
};
export default Webview;
