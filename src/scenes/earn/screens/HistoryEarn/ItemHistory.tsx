import DialogModal from 'components/BaseModal/DialogModal';
import React, {FC, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IDataEarn} from 'scenes/earn/redux/types';
import {showDialogModal} from 'services/globalModal/modalHandler';
import {resFont, resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import EarnDetailDialog from './EarnDetailDialog';
import {useTranslation} from 'react-i18next';

type IProps = {
  item: IDataEarn;
  onClick: (item: IDataEarn) => void;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.m_16,
    borderRadius: resWidth(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primaryBlack,
    backgroundColor: 'white',
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  item: {
    flex: 1,
  },
  address: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: resFont(12),
    lineHeight: resWidth(18),
    color: COLORS.primary,
    paddingLeft: SPACING.s_6,
  },
  date: {
    paddingLeft: SPACING.s_6,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: resFont(12),
    lineHeight: resWidth(16),
    color: COLORS.primary,
  },
});
const ItemHistory: FC<IProps> = ({item, onClick}) => {
  const {t} = useTranslation();
  const color = item.statusEarn === 'FAIL' ? COLORS.error : COLORS.green;
  const status = item.statusEarn === 'FAIL' ? t('earning.fail') : t('earning.success');

  const onOpenDetail = () => onClick(item);
  return (
    <TouchableOpacity style={styles.container} onPress={onOpenDetail}>
      <View style={styles.item}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="map-marker-outline"
            size={SPACING.m_16}
            color={COLORS.primary}
          />
          <Text style={styles.address} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon name="calendar" size={SPACING.m_16} color={COLORS.primary} />
          <Text style={styles.date} numberOfLines={1}>
            {item.createdAt}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon name="key" size={SPACING.m_16} color={COLORS.primary} />
          <Text style={styles.date} numberOfLines={1}>
            {item.earnID}
          </Text>
        </View>
      </View>
      <View style={{width: 80}}>
        <Text style={[styles.address, {color, textAlign: 'right'}]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ItemHistory;
