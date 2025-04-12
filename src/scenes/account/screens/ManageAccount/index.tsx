import Container from 'components/Container';
import {navigateScreen} from 'navigation/RootNavigation';
import {STACK_NAVIGATOR} from 'navigation/types';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {Button, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import accountApi from 'scenes/account/redux/api';
import {AuthActions} from 'scenes/auth/redux/slice';
import {useAppDispatch} from 'storeConfig/hook';
import { useTranslation } from 'react-i18next';
import {COLORS, SPACING} from 'utils/styleGuide';

const ManageAccount = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(AuthActions.logoutApp());
  };

  const logoutAndDeleteAccount = () => {
    dispatch(AuthActions.logoutApp());
    accountApi.apiDeleteAccount();
  };
  const onNavigate = (route: string) => {
    navigateScreen(route);
  };

  const SUB_MENU = [
    {
      title: t('account.profileUpdate'),
      icon: 'account-edit-outline',
      route: STACK_NAVIGATOR.UPDATE_ACCOUNT,
    },
    // {
    //   title: 'Liên kết tài khoản business',
    //   icon: 'account-lock-open-outline',
    //   route: STACK_NAVIGATOR.UPDATE_ACCOUNT,
    // },
  ];

  const warningDelete = () => {
    Alert.alert(
      t('account.deleteWarningTitle'),
      t('account.deleteWarningMessage'),
      [
        {
          text: t('account.stopDeleteAction'),
        },
        {
          text: t('account.continueDeleteAction'),
          style: 'destructive',
          onPress: logoutAndDeleteAccount,
        },
      ],
    );
  };
  return (
    <Container
      edges={['bottom']}
      style={{
        flex: 1,
        backgroundColor: COLORS.grey6,
      }}>
      {SUB_MENU.map(e => (
        <React.Fragment key={e.title}>
          <View style={{paddingVertical: SPACING.s_12}}>
            <TouchableOpacity
              onPress={() => onNavigate(e.route)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SPACING.m_16,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name={e.icon}
                  size={SPACING.l_24}
                  style={{paddingRight: SPACING.s_8}}
                />
                <Text>{e.title}</Text>
              </View>
              <Icon name="chevron-right" size={SPACING.l_24} />
            </TouchableOpacity>
          </View>
          <Divider />
        </React.Fragment>
      ))}

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: SPACING.s_12,
        }}>
        <Button
          mode="contained"
          style={{
            borderColor: COLORS.primaryPink,
            borderRadius: SPACING.s_12,
            marginBottom: SPACING.s_12,
            backgroundColor: COLORS.primaryPink,
          }}
          onPress={warningDelete}>
          <Text style={{color: COLORS.white}}>Xoá tài khoản</Text>
        </Button>
        <Button
          mode="outlined"
          style={{borderColor: COLORS.primaryPink, borderRadius: SPACING.s_12}}
          onPress={logout}>
          <Text style={{color: COLORS.primaryPink}}>Đăng xuất</Text>
        </Button>
      </View>
    </Container>
  );
};
export default ManageAccount;
