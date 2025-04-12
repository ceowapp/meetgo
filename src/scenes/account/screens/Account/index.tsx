import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Container from 'components/Container';
import {STACK_NAVIGATOR} from 'navigation/types';
import React, {FC, useCallback} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAccount from 'scenes/account/helper/useAccount';
import useAccountKyc from 'scenes/account/helper/useAccountKyc';
import {AccountSelector} from 'scenes/account/redux/slice';
import {useAppSelector} from 'storeConfig/hook';
import Platform from 'utils/Platform';
import {resFont} from 'utils/Screen';
import {SPACING, COLORS} from 'utils/styleGuide';
import { useAccountMenu } from './constants';
import AccountHeader from './Header';
import styles from './styles';
import { useTranslation } from 'react-i18next';

interface Props {
  icon: string;
  label: string;
  onPress: () => void;
  hasRightIcon?: boolean;
  type?: 'NONE' | 'PENDING' | 'REJECT' | 'DONE';
}

const CardProfile: FC<Props> = ({onPress, icon, label, type, hasRightIcon}) => {
  let iconName = 'alert-outline';
  let color = COLORS.red;
  if (type === 'PENDING') {
    iconName = 'alert-box-outline';
    color = COLORS.secondary;
  } else if (type === 'REJECT') {
    iconName = 'close-circle-outline';
    color = COLORS.red;
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={icon} size={SPACING.l_24} />
      <Text style={styles.label}>{label}</Text>
      {hasRightIcon && (
        <>
          <Icon name={iconName} size={SPACING.l_24} color={color} />
        </>
      )}
    </TouchableOpacity>
  );
};

const AccountScreens = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const ACCOUNT_MENU = useAccountMenu();
  const {getUserInfo} = useAccount();
  const {getInfoKyc, infoKyc} = useAccountKyc();
  const isVerify = infoKyc && infoKyc.isVerify;
  const accountVerify = useAppSelector(AccountSelector.getVerifyUser);

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
      getInfoKyc();
    }, []),
  );

  const hintMessageKyc = () => {
    let color = COLORS.red;
    if (infoKyc?.statusVerify === 'PENDING') {
      color = COLORS.secondary;
    } else if (infoKyc?.statusVerify === 'REJECT') {
      color = COLORS.red;
    }
    return (
      <Text
        style={{
          color,
          paddingHorizontal: SPACING.m_16,
          marginTop: -SPACING.s_12,
          paddingBottom: SPACING.s_12,
          fontStyle: 'italic',
          fontSize: resFont(12),
        }}>
        {`(${infoKyc?.messageVerify || t('account.verifyAccountWarning')})`}
      </Text>
    );
  };

  const navigateVerifyAccount = () => {
    if (
      !infoKyc?.statusVerify ||
      infoKyc?.statusVerify === 'REJECT' ||
      infoKyc?.statusVerify === 'NONE'
    ) {
      //@ts-ignore
      navigation.navigate(STACK_NAVIGATOR.VERIFY_ACCOUNT, {infoKyc});
    } else if (infoKyc?.statusVerify === 'PENDING') {
      //@ts-ignore
      navigation.navigate(STACK_NAVIGATOR.PREVIEW_ACCOUNT, {infoKyc});
    }
  };

  return (
    <Container edges={['top']}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.tertiary]}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <AccountHeader />
          <View style={styles.content}>
            {!isVerify && !accountVerify && (
              <>
                <CardProfile
                  icon="information-outline"
                  label={t('account.verifyAccount')}
                  onPress={navigateVerifyAccount}
                  hasRightIcon
                  type={infoKyc?.statusVerify}
                />
                {hintMessageKyc()}
                <Divider />
              </>
            )}
            {ACCOUNT_MENU.map(item => {
              const {icon, label, route, hasDivider, url} = item;
              const onPressItem = () => {
                if (url) {
                  // @ts-ignore
                  navigation.navigate(route, {
                    title: label,
                    url: url,
                  });
                } else {
                  // @ts-ignore
                  navigation.navigate(route);
                }
              };
              return (
                <React.Fragment key={label}>
                  <CardProfile
                    icon={icon}
                    label={label}
                    onPress={onPressItem}
                  />
                  <Divider />
                  {hasDivider ? <View style={styles.itemSeparator} /> : null}
                </React.Fragment>
              );
            })}
          </View>
          <Text
            style={{
              backgroundColor: 'white',
              fontFamily: 'Roboto',
              fontSize: resFont(12),
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
            Version: {Platform.appVersion}-b0
          </Text>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};
export default AccountScreens;
