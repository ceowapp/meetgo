import {useNavigation} from '@react-navigation/native';
import {ButtonPrimary} from 'components/Button/Primary';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import useEarn from 'scenes/earn/helper/useEarn';
import {
  IDataEarn,
  IReqCurrentEarn,
  IReqCurrentShop,
} from 'scenes/earn/redux/types';
import {locationSelector} from 'services/location/slice';
import {useAppSelector} from 'storeConfig/hook';
import {resFont, resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import CountDown from './CountDown';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  container: {
    height: resWidth(171),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.l_32,
  },
  btnStart: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: resWidth(180),
    height: SPACING.l_32,
    borderRadius: resWidth(10),
  },
  errorMessage: {
    textAlign: 'center',
    paddingVertical: SPACING.l_32,
    color: '#4E0282',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: resFont(12),
    lineHeight: resWidth(16),
  },
  styleDisable: {
    width: resWidth(180),
    height: SPACING.l_32,
    borderRadius: resWidth(10),
  },
  txtDisable: {
    color: COLORS.grey2,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontSize: resFont(14),
    lineHeight: resWidth(16),
  },
  txt: {
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontSize: resFont(14),
    lineHeight: resWidth(16),
    color: COLORS.primary,
  },
  warningEarn: {
    fontStyle: 'italic',
    fontFamily: 'Roboto',
    fontWeight: '700',
    lineHeight: resWidth(16),
    textAlign: 'center',
    color: COLORS.primary,
    paddingTop: resWidth(20),
  },
  txtMakeDone: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: resWidth(20),
    lineHeight: resWidth(24),
    color: COLORS.primary,
    textAlign: 'center',
  },
});
type EarnProps = {
  locationID: string;
  onSetDataEarn: (data: IReqCurrentEarn & {makeDone: boolean}) => void;
  propsEarn?: IDataEarn;
};
let stopCountDown = false;
const BtnStartEarn: FC<EarnProps> = ({
  locationID,
  onSetDataEarn,
  propsEarn,
}) => {
  const {t} = useTranslation();
  const {startEarn, verifyEarn, checkEarn, loading, dataEarn, errorMessage} =
    useEarn(propsEarn);
  const [finish, setFinish] = useState<boolean>(false);
  const [makeDone, setMakeDone] = useState<boolean>(false);
  const currentLocation = useAppSelector(locationSelector.getCurentLocation);

  useEffect(() => {
    const payload = {
      earnID: dataEarn?.earnID || '',
      currentLat: currentLocation?.latitude || 0,
      currentLong: currentLocation?.longitude || 0,
      makeDone,
    };
    onSetDataEarn(payload);
  }, [dataEarn?.countdownTime]);

  useEffect(() => {
    if (dataEarn && dataEarn?.countdownTime > 0) {
      let payload: IReqCurrentEarn = {
        earnID: dataEarn?.earnID || '',
        currentLat: currentLocation?.latitude || 0,
        currentLong: currentLocation?.longitude || 0,
        // currentLat: 10.729877175074606,
        // currentLong: 106.62474381431971,
      };
      const interval = setInterval(() => {
        if (stopCountDown) {
          clearInterval(interval);
        } else {
          checkEarn(payload);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dataEarn?.countdownTime]);
  const onStart = () => {
    if (currentLocation) {
      const payload: IReqCurrentShop = {
        locationID,
        currentLat: currentLocation?.latitude,
        currentLong: currentLocation?.longitude,
      };
      startEarn(payload);
    }
  };

  const onDone = async () => {
    if (currentLocation) {
      const payload: IReqCurrentEarn = {
        earnID: dataEarn?.earnID || '',
        currentLat: currentLocation?.latitude,
        currentLong: currentLocation?.longitude,
      };
      const status = await verifyEarn(payload);
      setMakeDone(status);
      onSetDataEarn({...payload, makeDone: true});
    }
  };
  const disableButton =
    loading || (dataEarn && dataEarn?.countdownTime > 0 && !finish);
  const styleBtn = disableButton ? styles.styleDisable : styles.btnStart;
  const txtBtn = disableButton ? styles.txtDisable : styles.txt;

  const onRenderErrorMessage = () => {
    if (errorMessage)
      return <Text style={styles.errorMessage}>{errorMessage}</Text>;
    return null;
  };

  const onCountDownSuccess = () => {
    stopCountDown = true;
    setFinish(true);
  };
  const titleEarn =
    dataEarn && dataEarn.countdownTime
      ? t('earning.done')
      : t('earning.start');

  const warningEarn =
    dataEarn && dataEarn.countdownTime
      ? t('earning.warning')
      : '';

  const congratSuccess = t('earning.success');
  const onActionEarn = !finish ? onStart : onDone;
  return (
    <View style={styles.container}>
      {onRenderErrorMessage()}
      {makeDone ? (
        <Text style={styles.txtMakeDone}>{congratSuccess}</Text>
      ) : (
        <>
          {dataEarn?.countdownTime && (
            <CountDown
              timeStamp={dataEarn.countdownTime}
              onCountDownSuccess={onCountDownSuccess}
            />
          )}
          <ButtonPrimary
            onPress={onActionEarn}
            disabled={disableButton}
            containerStyle={styleBtn}
            titleStyle={txtBtn}
            content={titleEarn}
          />
          {warningEarn && (
            <Text style={styles.warningEarn}>{warningEarn} </Text>
          )}
        </>
      )}
    </View>
  );
};
export default BtnStartEarn;
