import Logo from 'components/Logo';
import {IStatusMeet} from 'constant/commonType';
import moment from 'moment';
import React, {FC, useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IResHistoryMeet} from 'scenes/meets/redux/types';
import {resFont} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import { useTranslation } from 'react-i18next';

type IProps = {
  item: IResHistoryMeet;
  account: string;
  onNavigateHistoryDetail: (item: IResHistoryMeet) => void;
};
const ItemHistory: FC<IProps> = ({item, account, onNavigateHistoryDetail}) => {
  const { t } = useTranslation();
  const isCaller = item.accountInvite === account;
  const iconCaller = isCaller ? 'phone-outgoing' : 'phone-incoming';
  const nameMeeter = isCaller
    ? `${item.firstnameAccountInvited} ${item.lastnameAccountInvited}`
    : `${item.firstnameAccountInvite} ${item.lastnameAccountInvite}`;
  const avatar = isCaller ? item.imageAccountInvited : item.imageAccountInvite;
  const dataStatus = useMemo(() => {
    let color = COLORS.primaryYellow;
    let content = t('meets.status_waiting');

    switch (item.statusMeet) {
      case IStatusMeet.DONE:
      case IStatusMeet.PENDING_SUCCESS: {
        color = COLORS.darkGreen;
        content = t('meets.status_success');
        break;
      }
      case IStatusMeet.INVITED_REJECT:
      case IStatusMeet.INVITE_REJECT: {
        color = COLORS.error;
        content = t('meets.status_invited_reject');
        break;
      }
      case IStatusMeet.INVITED_FAIL:
      case IStatusMeet.FAIL:
      case IStatusMeet.INVITE_FAIL: {
        color = COLORS.error;
        content = t('meets.status_meet_failed');
        break;
      }
      case IStatusMeet.PENDING: {
        color = COLORS.primaryYellow;
        content = t('meets.status_waiting');
        break;
      }
      case IStatusMeet.READY: {
        content = t('meets.status_calling');
        color = COLORS.primaryYellow;
        break;
      }
    }

    return {color, content};
  }, [item.statusMeet, t]);

  const onClick = () => onNavigateHistoryDetail(item);
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        padding: SPACING.m_16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: SPACING.s_6,
            }}>
            <Icon
              name={iconCaller}
              size={SPACING.m_16}
              color={dataStatus.color}
              style={{paddingRight: SPACING.s_6}}
            />
            {avatar ? (
              <Avatar.Image source={{uri: avatar}} size={SPACING.l_24} />
            ) : (
              <Logo />
            )}
            <Text variant="titleMedium" style={{paddingLeft: SPACING.s_6}}>
              {nameMeeter}
            </Text>
            <Text
              numberOfLines={1}
              style={{paddingLeft: 3, fontSize: resFont(10)}}>
              ({item.connectId})
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="map-marker-radius" size={SPACING.m_16} />
            <Text numberOfLines={1} style={{paddingLeft: SPACING.s_6}}>
              {item.address}
            </Text>
          </View>
          <View style={{paddingTop: SPACING.s_6, flexDirection: 'row'}}>
            <Icon name="calendar" size={SPACING.m_16} />
            <Text style={{paddingLeft: SPACING.s_6}}>
              {moment
                .unix(item.createdAtTimestamp)
                .format('DD-MM-YYYY HH:mm:ss')}
            </Text>
          </View>
        </View>
        <Text style={{color: dataStatus.color, flex: 0.4, textAlign: 'right'}}>
          {dataStatus.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ItemHistory;
