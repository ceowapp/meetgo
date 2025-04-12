import {RouteProp, useRoute} from '@react-navigation/native';
import LineBreak from 'components/LineBreak';
import Logo from 'components/Logo';
import {IStatusMeet} from 'constant/commonType';
import moment from 'moment';
import {AppStackParamList} from 'navigation/types';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {AuthSelector} from 'scenes/auth/redux/slice';
import {useAppSelector} from 'storeConfig/hook';
import {COLORS, SPACING} from 'utils/styleGuide';
import { useTranslation } from 'react-i18next';

const HistoryMeetDetail = () => {
  const { t } = useTranslation();
  const {params} =
    useRoute<RouteProp<AppStackParamList, 'HISTORY_MEET_DETAIL'>>();
  const account = useAppSelector(AuthSelector.getAccount);
  const {item} = params;
  const isCaller = item.accountInvite === account;
  const nameMeeter = isCaller
    ? `${item.firstnameAccountInvited} ${item.lastnameAccountInvited}`
    : `${item.firstnameAccountInvite} ${item.lastnameAccountInvite}`;
  const avatar = isCaller ? item.imageAccountInvited : item.imageAccountInvite;
  const bonusMeetPoint = isCaller
    ? item.meetpointForInvite
    : item.meetpointForInvited;
  const dataStatus = useMemo(() => {
    let color = COLORS.primaryYellow;
    let content = t('meets.status_waiting');
    switch (item.statusMeet) {
      case IStatusMeet.DONE:
      case IStatusMeet.PENDING_SUCCESS: {
        color = COLORS.darkGreen;
        content = t('meets.status_meet_success');
        break;
      }
      case IStatusMeet.INVITED_REJECT: {
        content = isCaller
          ? t('meets.status_invited_reject')
          : t('meets.status_you_reject');
        color = COLORS.error;
        break;
      }
      case IStatusMeet.INVITE_REJECT: {
        content = isCaller
          ? t('meets.status_you_reject')
          : t('meets.status_invited_reject');
        color = COLORS.error;
        break;
      }
      case IStatusMeet.INVITED_FAIL: {
        content = isCaller
          ? t('meets.status_invited_early_end')
          : t('meets.status_you_early_end');
        color = COLORS.error;
        break;
      }
      case IStatusMeet.INVITE_FAIL: {
        content = isCaller
          ? t('meets.status_you_early_end')
          : t('meets.status_invited_early_end');
        color = COLORS.error;
        break;
      }
      case IStatusMeet.FAIL: {
        content = t('meets.status_meet_failed');
        color = COLORS.error;
        break;
      }
      case IStatusMeet.PENDING: {
        content = t('meets.status_call_pending');
        color = COLORS.primaryYellow;
        break;
      }
      case IStatusMeet.READY: {
        content = t('meets.status_calling_now');
        color = COLORS.primaryYellow;
        break;
      }
    }
    return { color, content };
  }, [item.statusMeet, isCaller, t]);

  return (
    <View style={{padding: SPACING.m_16}}>
      <View
        style={{
          paddingVertical: SPACING.m_16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {avatar ? (
          <Avatar.Image source={{uri: avatar}} size={SPACING.xl_64} />
        ) : (
          <Logo size={SPACING.xl_56} />
        )}
        <Text variant="headlineLarge" style={{paddingLeft: SPACING.m_16}}>
          {nameMeeter}
        </Text>
      </View>
      <LineBreak />
      <View
        style={{
          backgroundColor: COLORS.onSecondary,
          padding: SPACING.m_16,
          borderRadius: SPACING.m_16,
          marginVertical: SPACING.m_16,
        }}>
        <View style={{flexDirection: 'row', paddingBottom: SPACING.m_16}}>
            <Text>{t('meets.label_location')}:</Text>
           <View style={{flex: 1, paddingLeft: SPACING.s_6}}>
            <Text style={{fontWeight: 'bold'}}>{item.address}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: SPACING.m_16}}>
          <Text>{t('meets.label_time')}:</Text>
          <View style={{flex: 1, paddingLeft: SPACING.s_6}}>
            <Text style={{fontWeight: 'bold'}}>
              {moment
                .unix(item.createdAtTimestamp)
                .format('DD-MM-YYYY HH:mm:ss')}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: SPACING.m_16}}>
          <Text>{t('meets.label_status')}:</Text>
          <View style={{flex: 1, paddingLeft: SPACING.s_6}}>
            <Text style={{fontWeight: 'bold', color: dataStatus.color}}>
              {dataStatus.content}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: SPACING.m_16}}>
          <Text>{t('meets.label_point')}:</Text>
          <View style={{flex: 1, paddingLeft: SPACING.s_6}}>
            <Text style={{fontWeight: 'bold', color: dataStatus.color}}>
              {bonusMeetPoint || 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HistoryMeetDetail;
