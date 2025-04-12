import LottieView from 'lottie-react-native';
import {Permission} from 'manager/appPermission';
import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {PermissionStatus, RESULTS} from 'react-native-permissions';
import {locationActions} from 'services/location/slice';
import {useAppDispatch} from 'storeConfig/hook';
import Images from 'utils/Images';
import {perWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import { useTranslation } from 'react-i18next';

type IProps = {
  setResultPermission: (result: PermissionStatus) => void;
};
const SectionCheckLocation: FC<IProps> = ({setResultPermission}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const onRequestPermission = async () => {
    const result = await Permission.requestPermission('location');
    if (result === RESULTS.GRANTED) {
      dispatch(locationActions.updatePermissionLocation(result));
    }
    setResultPermission(result);
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
        source={Images.animation.introLocation}
        style={{width: perWidth(60), aspectRatio: 1}}
      />
      <Text variant="titleMedium" style={{textAlign: 'center'}}>
        {t('location.check_title')}
      </Text>
      <Button
        mode="elevated"
        style={{marginTop: SPACING.s_12}}
        onPress={onRequestPermission}>
        {t('location.check_grant_now')}
      </Button>
    </View>
  );
};
export default SectionCheckLocation;
