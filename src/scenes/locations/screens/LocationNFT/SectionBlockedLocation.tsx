import LottieView from 'lottie-react-native';
import {Permission} from 'manager/appPermission';
import React, {FC} from 'react';
import {Linking, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {PermissionStatus, RESULTS} from 'react-native-permissions';
import Images from 'utils/Images';
import Platform from 'utils/Platform';
import {perWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import {Permission as PermissionApp} from 'manager/appPermission';
import { useTranslation } from 'react-i18next';

type IProps = {
  resultPermission: PermissionStatus;
  setResultPermission: (result: PermissionStatus) => void;
};
const SectionBlockedLocation: FC<IProps> = ({
  resultPermission,
  setResultPermission,
}) => {
  const { t } = useTranslation();
  const onOpenSettings = async () => {
    if (Platform.isIos) {
      if (resultPermission === RESULTS.UNAVAILABLE) {
        const linkingPermission = 'App-prefs:Privacy&path=LOCATION';
        const canOpenPermission = await Linking.canOpenURL(linkingPermission);
        if (canOpenPermission) {
          Linking.openURL(linkingPermission);
        }
      } else {
        Linking.openSettings();
      }
    } else {
      const result = await PermissionApp.checkPermission('location');
      if (result !== RESULTS.GRANTED) {
        await Linking.openSettings();
      } else {
        setResultPermission(result);
      }
    }
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.onSecondary,
      }}>
      <LottieView
        loop
        autoPlay
        source={Images.animation.permissionLocation}
        style={{
          width: perWidth(60),
          aspectRatio: 1,
          marginBottom: SPACING.l_32,
        }}
      />
      <Text variant="titleMedium" style={{textAlign: 'center'}}>
        {t('location.blocked_title')}
      </Text>
      <Button
        mode="elevated"
        style={{marginTop: SPACING.s_12}}
        onPress={onOpenSettings}>
        {t('location.grant_now')}
      </Button>
    </View>
  );
};
export default SectionBlockedLocation;
