import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, RadioButton, Text} from 'react-native-paper';
import useAccount from 'scenes/account/helper/useAccount';
import {AccountSelector} from 'scenes/account/redux/slice';
import {useAppSelector} from 'storeConfig/hook';
import {perWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputNormal from 'components/Input/InputNormal';
import InputDateTime from 'components/Input/InputDateTime';
import moment from 'moment';
import {goBack} from 'navigation/RootNavigation';
import {validNumber, validateEmail} from 'utils/Utility';
import { useTranslation } from 'react-i18next';

const UpdateAccount = () => {
  const { t } = useTranslation();
  const userInfo = useAppSelector(AccountSelector.getUserInfo);
  const [firstname, setFirstName] = useState(userInfo?.firstname || '');
  const [lastname, setLastName] = useState(userInfo?.lastname || '');
  const [birthday, setBirthday] = useState<Date>(
    userInfo?.birthday
      ? moment(userInfo.birthday, 'DD-MM-YYYY').toDate()
      : new Date(),
  );
  const [phone, setPhone] = useState(userInfo?.mobilenumber || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [address, setAddress] = useState(userInfo?.address || '');
  const [gender, setGender] = useState(userInfo?.gender || '');
  const idAuth = useAppSelector(AccountSelector.getIdAuth);

  const {loading, updateUserInfo, getUserInfo} = useAccount();
  const scrollRef = useRef();

  const onUpdateSuccess = () => {
    goBack();
    getUserInfo();
  };
  const onPressLater = () => {
    if (
      validateFirstName() ||
      validateLastName() ||
      validPhoneNumber() ||
      validEmail()
    ) {
      return;
    }
    if (idAuth) {
      const dataPayload = {
        idAuth,
        firstname,
        lastname,
        mobilenumber: phone,
        email,
        address,
        gender,
        birthday: moment(birthday).format('DD-MM-YYYY'),
      };
      updateUserInfo(dataPayload, onUpdateSuccess);
    }
  };

  const validateFirstName = () => {
    return firstname.trim().length < 1;
  };

  const validateLastName = () => {
    return lastname.trim().length < 1;
  };

  const validPhoneNumber = () => {
    return !validNumber(phone);
  };

  const validEmail = () => {
    return !validateEmail(email);
  };
  const contentInfo = (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <InputNormal
          label={t('account.inputLabelFirstName')}
          value={firstname}
          placeholder={t('account.inputPlaceholderFirstName')}
          onChangeText={setFirstName}
          onValidate={validateFirstName}
          errorMess={t('account.inputErrorFirstName')}
          icon="account"
          containerInputStyle={{
            width: perWidth(40),
          }}
        />
        <View style={{width: SPACING.s_12, aspectRatio: 1}} />
        <InputNormal
          label={t('account.inputLabelLastName')}
          value={lastname}
          placeholder={t('account.inputPlaceholderLastName')}
          onChangeText={setLastName}
          onValidate={validateLastName}
          errorMess={t('account.inputErrorLastName')}
          icon="account"
          containerInputStyle={{
            width: perWidth(40),
          }}
        />
      </View>
      <InputNormal
        label={t('account.inputLabelPhonenumber')}
        value={phone}
        placeholder={t('account.inputPlaceholderPhonenumber')}
        onChangeText={setPhone}
        onValidate={validPhoneNumber}
        errorMess={t('account.inputErrorPhonenumber')}
        icon="phone"
        maxLength={10}
        keyboardType="numeric"
      />
      <InputNormal
        label={t('account.inputLabelEmail')}
        value={email}
        placeholder={t('account.inputPlaceholderEmail')}
        onChangeText={setEmail}
        errorMess={t('account.inputErrorEmail')}
        onValidate={validEmail}
        icon="email"
        keyboardType="email-address"
      />
      <InputNormal
        label={t('account.inputLabelAddress')}
        value={address}
        placeholder={t('account.inputPlaceholderAddress')}
        onChangeText={setAddress}
        icon="card-text"
      />
      <InputDateTime
        textInputProps={{
          label: t('account.inputLabelYearborn'),
          icon: 'calendar-account',
        }}
        datePickerProps={{
          mode: 'date',
          title: t('account.inputTitleYearborn'),
          confirmText: t('account.inputConfirmTextYearborn'),
          cancelText: t('account.inputCancelTextYearborn'),
          maximumDate: new Date(),
          dateValue: birthday,
        }}
        onChangeValue={setBirthday}
      />
      <RadioButton.Group onValueChange={setGender} value={gender}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>{t('account.radioMaleOption')}</Text>
            <RadioButton.Android value="male" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>{t('account.radioFemaleOption')}</Text>
            <RadioButton.Android value="female" />
          </View>
        </View>
      </RadioButton.Group>
      <Button
        mode="outlined"
        onPress={onPressLater}
        loading={loading}
        disabled={loading}
        style={{borderRadius: SPACING.s_8, marginTop: SPACING.m_16}}>
        {t('account.updateAction')}
      </Button>
    </View>
  );
  return (
    <KeyboardAwareScrollView
      innerRef={scrollRef.current}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: SPACING.l_24,
        backgroundColor: COLORS.grey6,
        flex: 1,
      }}>
      {contentInfo}
    </KeyboardAwareScrollView>
  );
};

export default UpdateAccount;
