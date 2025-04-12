import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IResHistoryTransfer} from 'scenes/meets/redux/types';
import {COLORS, SPACING} from 'utils/styleGuide';
import { useTranslation } from 'react-i18next';

type IProps = {
  item: IResHistoryTransfer;
  account: string;
};
const ItemHistory: FC<IProps> = ({item, account}) => {
  const { t } = useTranslation();
  const isSender = item.accountSend === account;
  const iconSender = isSender ? 'bank-minus' : 'bank-plus';
  const nameMeeter = isSender
    ? `${item.accountSend}`
    : `${item.accountReceive}`;
  const color = isSender ? COLORS.error : COLORS.green;
  const messageReceive = t('meets.history_transfer_received', {
    amount: item.amount,
    from: item.accountSend,
  });
  const messageSent = t('meets.history_transfer_sent', {
    amount: item.amount,
    to: item.accountReceive,
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: SPACING.s_12,
        paddingHorizontal: SPACING.m_16,
        borderRadius: SPACING.s_8,
        alignItems: 'center',
      }}>
      <Icon name={iconSender} size={24} color={color} />
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          paddingLeft: SPACING.s_12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <Text variant="titleMedium" numberOfLines={2}>
            {isSender ? messageSent : messageReceive}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="calendar" size={SPACING.m_16} />
            <Text
              variant="labelMedium"
              style={{fontStyle: 'italic', paddingLeft: SPACING.s_6}}>
              {item.createdAt}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ItemHistory;
