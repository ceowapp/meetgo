import {ButtonPrimary} from 'components/Button/Primary';
import moment from 'moment';
import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IDataHistoryMeet} from 'scenes/meets/redux/types';
import {hideModal} from 'services/globalModal/modalHandler';
import {COLORS, SPACING} from 'utils/styleGuide';
import { useTranslation } from 'react-i18next';

type IWarningMeetProps = {
  data: IDataHistoryMeet;
  fullName: string;
  onInviteMeetUser: () => void;
  rateBonusAgain: number;
};
const WarningMeetDialog: FC<IWarningMeetProps> = ({
  data,
  fullName,
  onInviteMeetUser,
  rateBonusAgain,
}) => {
  const { t } = useTranslation();
  const timeMeet = moment
    .unix(data.createdAtTimestamp)
    .format('DD-MM-YYYY HH:mm:ss');

  const onCancel = () => hideModal();
  const onConfirm = () => {
    hideModal();
    onInviteMeetUser();
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: SPACING.m_16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SPACING.s_12,
      }}>
      <Icon name="alert" size={SPACING.l_32} color={COLORS.primaryYellow} />
      <Text variant="titleSmall" style={{textAlign: 'center'}}>
        {t('meets.warning_previous_meet', { fullName })}
        <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
          {timeMeet}
        </Text>
      </Text>
      <Text variant="titleSmall">
        {t('meets.warning_rate_bonus_again', { rateBonusAgain })}
      </Text>
      <View style={{flexDirection: 'row', paddingTop: SPACING.s_8}}>
        <ButtonPrimary
          content={t('meets.warning_button_skip')}
          containerStyle={{flex: 1, backgroundColor: COLORS.red}}
          onPress={onCancel}
        />
        <View style={{width: SPACING.s_12}} />
        <ButtonPrimary
          content={t('meets.warning_button_continue')}
          containerStyle={{flex: 1}}
          onPress={onConfirm}
        />
      </View>
    </View>
  );
};

export default WarningMeetDialog;
