import {ButtonPrimary} from 'components/Button/Primary';
import Container from 'components/Container';
import InputDateTime from 'components/Input/InputDateTime';
import InputNormal from 'components/Input/InputNormal';
import moment from 'moment';
import React, {FC, useState} from 'react';
import useAccountKyc from 'scenes/account/helper/useAccountKyc';
import {IReqUpdateInfoKYC, IResInfoKyc} from 'scenes/account/redux/types';
import {resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import {validNumber} from 'utils/Utility';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

type IProps = {
  onNextPage: () => void;
  infoKyc?: IResInfoKyc;
};
const UpdateInfoKYC: FC<IProps> = ({onNextPage, infoKyc}) => {
  const {t} = useTranslation();
  const {bottom} = useSafeAreaInsets();
  const [fullname, setFullName] = useState<string>(infoKyc?.fullname || '');
  const [birthday, setBirthday] = useState<Date>(
    infoKyc?.birthday
      ? moment(infoKyc.birthday, 'DD-MM-YYYY').toDate()
      : new Date(),
  );
  const [idday, setIdDay] = useState<Date>(
    infoKyc?.idday ? moment(infoKyc.idday, 'DD-MM-YYYY').toDate() : new Date(),
  );
  const [idnumber, setIdNumber] = useState<string>(
    infoKyc?.idnumber.toString() || '',
  );
  const [idplace, setIdPlace] = useState<string>(infoKyc?.idplace || '');
  const [isSubmit, setIsSubmit] = useState(false);
  const {updateInfoKyc, loading} = useAccountKyc();
  const callback = (status: {status: boolean}) => {
    if (status) {
      onNextPage();
    }
  };
  const onUpdateKyc = () => {
    setIsSubmit(true);
    if (validFullName(true) || validPlace(true) || validIdNumber(true)) {
      return;
    } else {
      const data: IReqUpdateInfoKYC = {
        idday: moment(idday).format('DD-MM-YYYY'),
        birthday: moment(birthday).format('DD-MM-YYYY'),
        fullname,
        idnumber,
        idplace,
      };
      updateInfoKyc(data, callback);
    }
  };

  const validIdNumber = (isValidate = false) => {
    if (isValidate && (idnumber.length !== 12 || !validNumber(idnumber))) {
      return true;
    }
    if (isSubmit && (idnumber.length !== 12 || !validNumber(idnumber))) {
      return true;
    } else if (idnumber && idnumber.length !== 12) {
      return true;
    }
    return false;
  };

  const validFullName = (isValidate = false) => {
    if (isValidate && fullname.length < 3) {
      return true;
    }
    if (isSubmit && fullname.length < 3) {
      return true;
    } else if (fullname && fullname.length < 3) {
      return true;
    }
    return false;
  };
  const validPlace = (isValidate = false) => {
    if (isValidate && idplace.length < 3) {
      return true;
    }
    if (isSubmit && idplace.length < 3) {
      return true;
    } else if (idplace && idplace.length < 3) {
      return true;
    }
    return false;
  };
  return (
    <Container
      edges={['bottom']}
      style={{
        backgroundColor: COLORS.transparent,
        paddingBottom: bottom > 0 ? 0 : SPACING.l_24,
      }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        style={{
          flex: 1,
          borderRadius: SPACING.m_16,
          paddingTop: SPACING.s_12,
          paddingHorizontal: SPACING.s_12,
          backgroundColor: COLORS.backgroundWhite70,
        }}>
        <InputNormal
          label={t('account.fullnameLabel')}
          value={fullname}
          placeholder={t('account.fullnamePlaceholder')}
          onChangeText={setFullName}
          onValidate={validFullName}
          errorMess={t('account.fullnameError')}
          icon="account"
          containerInputStyle={{
            width: '100%',
          }}
        />
        <InputDateTime
          textInputProps={{
            label: t('account.birthdayLabel'),
            icon: 'calendar-account',
          }}
          datePickerProps={{
            mode: 'date',
            title: t('account.birthdayTitle'),
            confirmText: t('account.confirm'),
            cancelText: t('account.cancel'),
            maximumDate: new Date(),
            dateValue: birthday,
          }}
          onChangeValue={setBirthday}
        />
        <InputNormal
          label={t('account.idnumberLabel')}
          value={idnumber}
          placeholder={t('account.idnumberPlaceholder')}
          onChangeText={setIdNumber}
          onValidate={validIdNumber}
          errorMess={t('account.idnumberError')}
          icon="card-bulleted-outline"
          maxLength={12}
          keyboardType="numeric"
        />
        <InputDateTime
          textInputProps={{
            label: t('account.iddayLabel'),
            icon: 'calendar-clock',
          }}
          datePickerProps={{
            mode: 'date',
            title: t('account.iddayTitle'),
            confirmText: t('account.confirm'),
            cancelText: t('account.cancel'),
            maximumDate: new Date(),
            dateValue: idday,
          }}
          onChangeValue={setIdDay}
        />
        <InputNormal
          label={t('account.idplaceLabel')}
          value={idplace}
          placeholder={t('account.idplacePlaceholder')}
          onChangeText={setIdPlace}
          onValidate={validPlace}
          errorMess={t('account.idplaceError')}
          icon="card-text-outline"
          containerInputStyle={{
            width: '100%',
          }}
        />
      </KeyboardAwareScrollView>
      <ButtonPrimary
        content={t('account.submit')}
        onPress={onUpdateKyc}
        disabled={loading}
        isLoading={loading}
        containerStyle={{marginTop: SPACING.l_24}}
      />
    </Container>
  );
};
export default UpdateInfoKYC;
