import Container from 'components/Container';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Card, HelperText, Text, TextInput} from 'react-native-paper';
import useAccount from 'scenes/account/helper/useAccount';
import {AccountSelector} from 'scenes/account/redux/slice';
import {IFormOnboarding} from 'scenes/account/redux/types';
import {AuthActions, AuthSelector} from 'scenes/auth/redux/slice';
import {useAppDispatch, useAppSelector} from 'storeConfig/hook';
import {perHeight, resFont} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import { useTranslation } from 'react-i18next';

const style = StyleSheet.create({
  input: {
    backgroundColor: COLORS.lightBlue,
    marginTop: SPACING.s_12,
    borderTopLeftRadius: SPACING.s_8,
    borderTopRightRadius: SPACING.s_8,
    borderRadius: SPACING.s_8,
  },
  spacing: {width: SPACING.s_12, aspectRatio: 1},
  refCode: {
    backgroundColor: COLORS.lightBlue,
    marginTop: SPACING.s_12,
    marginBottom: SPACING.m_16,
    borderTopLeftRadius: SPACING.s_8,
    borderTopRightRadius: SPACING.s_8,
    borderRadius: SPACING.s_8,
  },
});
const OnboardingScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const getFirstName = useAppSelector(AccountSelector.getFirstName);
  const getLastName = useAppSelector(AccountSelector.getLastName);
  const getEmail = useAppSelector(AccountSelector.getEmail);
  const [referral, setReferral] = useState('');
  // const [firstname, setFirstName] = useState(getFirstName || '');
  // const [lastname, setLasstName] = useState(getLastName || '');
  // const [email, setEmail] = useState(getEmail || '');
  const idAuth = useAppSelector(AccountSelector.getIdAuth);
  const account = useAppSelector(AuthSelector.getAccount);
  const {loading, updateFirstSignup} = useAccount();

  const onboardSuccess = () => {
    dispatch(AuthActions.setRegisterSuccess());
  };
  const onPressLater = () => {
    navigateScreen(STACK_NAVIGATOR.AUTHEN_ONBOARD);
    // if (validateFirstName() || validateLastName() || validatorEmail()) {
    //   return;
    // }
    if (idAuth) {
      const dataPayload: IFormOnboarding = {
        idAuth,
        account,
        firstname: getFirstName || '',
        lastname: getLastName || '',
        email: getEmail || '',
        referral,
      };
      updateFirstSignup(dataPayload, onboardSuccess);
    }
  };

  // const validateFirstName = () => {
  //   return firstname.trim().length < 1;
  // };

  // const validateLastName = () => {
  //   return lastname.trim().length < 1;
  // };

  // const validatorEmail = () => {
  //   return !validateEmail(email);
  // };
//        Cập nhật thông tin của bạn!

  const headerInfo = (
    <>
      <Text variant="headlineMedium" style={{color: COLORS.white}}>
        {t('onBoarding.title')}
      </Text>
      <Text
        variant="titleMedium"
        style={{color: COLORS.white, paddingVertical: SPACING.s_8}}>
        {t('onBoarding.subtitle')}
      </Text>
    </>
  );

  const contentInfo = (
    <Card mode="elevated">
      <Card.Content>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <TextInput
              mode="flat"
              label="Họ"
              value={firstname}
              placeholder="Nhập họ"
              onChangeText={setFirstName}
              underlineColor={COLORS.lightBlue}
              style={style.input}
            />
            <HelperText
              type="error"
              visible={validateFirstName()}
              padding="none"
              style={{
                fontSize: resFont(12),
              }}>
              Họ không được để trống
            </HelperText>
          </View>
          <View style={style.spacing} />
          <View style={{flex: 1}}>
            <TextInput
              mode="flat"
              label="Tên"
              value={lastname}
              placeholder="Nhập tên"
              onChangeText={setLasstName}
              underlineColor={COLORS.lightBlue}
              style={style.input}
            />
            <HelperText
              type="error"
              visible={validateLastName()}
              padding="none"
              style={{
                fontSize: resFont(12),
              }}>
              Tên không được để trống
            </HelperText>
          </View>
        </View> */}
        {/* <TextInput
          mode="flat"
          label="Email"
          placeholder="Nhập email"
          onChangeText={setEmail}
          value={email}
          underlineColor={COLORS.lightBlue}
          style={style.input}
        />
        <HelperText
          type="error"
          visible={validatorEmail()}
          padding="none"
          style={{
            fontSize: resFont(12),
          }}>
          Email không tồn tại
        </HelperText> */}
        <TextInput
          mode="flat"
          label={t('onBoarding.referralLabel')}
          placeholder={t('onBoarding.referralPlaceholder')}
          onChangeText={setReferral}
          underlineColor={COLORS.lightBlue}
          style={style.refCode}
          keyboardType="numeric"
        />
        <HelperText
          type="info"
          visible={true}
          padding="none"
          style={{
            fontSize: resFont(12),
          }}>
          {t('onBoarding.referralHelper')}
        </HelperText>
        <Button
          mode="outlined"
          onPress={onPressLater}
          loading={loading}
          disabled={loading}
          style={{borderRadius: SPACING.s_8}}>
          {t('onBoarding.update')}
        </Button>
      </Card.Content>
    </Card>
  );
  return (
    <Container edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.white]}
          style={{
            height: perHeight(100),
            alignItems: 'center',
            padding: SPACING.m_16,
          }}>
          <View>
            {headerInfo}
            {contentInfo}
          </View>
        </LinearGradient>
      </ScrollView>
    </Container>
  );
};

export default OnboardingScreen;
