import moment from 'moment';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {resFont, resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import {clockify, useCountdown} from 'utils/Utility';
import {useTranslation} from 'react-i18next';

type ICountDown = {
  timeStamp: number;
  onCountDownSuccess: () => void;
};
const styles = StyleSheet.create({
  countDownContainer: {
    borderColor: '#4E0282',
    borderWidth: 1,
    borderRadius: resWidth(10),
    paddingHorizontal: SPACING.m_16,
    paddingVertical: SPACING.s_4,
    alignItems: 'center',
    marginBottom: SPACING.l_32,
  },
  txtTitle: {
    fontFamily: 'Roboto',
    fontSize: resFont(12),
    fontWeight: '400',
    lineHeight: resWidth(16),
    color: '#4E0282',
  },
  txtNumber: {
    fontFamily: 'Roboto',
    fontSize: resFont(20),
    fontWeight: '700',
    lineHeight: resWidth(24),
    color: '#4E0282',
  },
});
const CountDown: FC<ICountDown> = ({timeStamp, onCountDownSuccess}) => {
  const {t} = useTranslation();
  const timeCountDown = moment.unix(timeStamp).toString();
  const secondsRemaining = useCountdown(timeCountDown, onCountDownSuccess);
  const {displayMinutes, displaySecs} = clockify(secondsRemaining);

  return (
    <View style={styles.countDownContainer}>
      <Text style={styles.txtTitle}>{t('earning.remainingTime')}</Text>
      <Text style={styles.txtNumber}>
        {displayMinutes}: {displaySecs}
      </Text>
    </View>
  );
};

export default CountDown;
