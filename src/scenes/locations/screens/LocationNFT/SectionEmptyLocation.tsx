import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Images from 'utils/Images';
import {perWidth} from 'utils/Screen';
import {SPACING} from 'utils/styleGuide';
import { useTranslation } from 'react-i18next';

const SectionEmptyLocation = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        loop
        autoPlay
        source={Images.animation.emptyLocation}
        style={{
          width: perWidth(60),
          aspectRatio: 1,
          marginBottom: SPACING.l_32,
        }}
      />
      <Text variant="titleMedium" style={{textAlign: 'center'}}>
       {t('location.empty_title')}
      </Text>
    </View>
  );
};
export default SectionEmptyLocation;
