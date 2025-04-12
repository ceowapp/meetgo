import {useScrollToTop} from '@react-navigation/native';
import LineBreak from 'components/LineBreak';
import React, {useEffect, useRef} from 'react';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';
import SectionEmpty from 'scenes/meets/components/SectionEmpty';
import SkeletonHistory from 'scenes/meets/components/SkeletonHistory';
import {useMeet} from 'scenes/meets/helper/useMeet';
import {IResHistoryTransfer} from 'scenes/meets/redux/types';
import {SPACING} from 'utils/styleGuide';
import ItemHistory from './ItemHistory';

const HistoryPointScreen = () => {
  const {loading, getHistoryTransferPoint, listHistoryTransfer, account} =
    useMeet();
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  useEffect(() => {
    getHistoryTransferPoint();
  }, []);

  const onRefresh = () => getHistoryTransferPoint();

  const dataEmpty = () => {
    if (loading) {
      return <SkeletonHistory />;
    }
    return <SectionEmpty />;
  };

  const renderItem: ListRenderItem<IResHistoryTransfer> = ({item}) => (
    <ItemHistory item={item} account={account} />
  );
  const seperator = () => <LineBreak />;

  const keyExtract = (item: IResHistoryTransfer, index: number) =>
    index.toString();

  return (
    <FlatList
      data={listHistoryTransfer}
      renderItem={renderItem}
      keyExtractor={keyExtract}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={dataEmpty}
      ItemSeparatorComponent={seperator}
      style={{flex: 1, paddingVertical: SPACING.m_16}}
    />
  );
};
export default HistoryPointScreen;
