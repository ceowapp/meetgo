import {useNavigation, useScrollToTop} from '@react-navigation/native';
import LineBreak from 'components/LineBreak';
import {STACK_NAVIGATOR} from 'navigation/types';
import React, {useEffect, useRef} from 'react';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import SectionEmpty from 'scenes/meets/components/SectionEmpty';
import SkeletonHistory from 'scenes/meets/components/SkeletonHistory';
import {useMeet} from 'scenes/meets/helper/useMeet';
import {IResHistoryMeet} from 'scenes/meets/redux/types';
import {SPACING} from 'utils/styleGuide';
import ItemHistory from './ItemHistory';

const HistoryMeetScreen = () => {
  const {loading, getHistoryMeet, listHistoryMeet, account} = useMeet();
  const {navigate} = useNavigation();
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  useEffect(() => {
    getHistoryMeet();
  }, []);

  const onRefresh = () => getHistoryMeet();

  const onNavigateHistoryDetail = (item: IResHistoryMeet) =>
    // @ts-ignore
    navigate(STACK_NAVIGATOR.HISTORY_MEET_DETAIL, {item});

  const dataEmpty = () => {
    if (loading) {
      return <SkeletonHistory />;
    }
    return <SectionEmpty />;
  };

  const renderItem: ListRenderItem<IResHistoryMeet> = ({item}) => (
    <ItemHistory
      item={item}
      account={account}
      onNavigateHistoryDetail={onNavigateHistoryDetail}
    />
  );
  const seperator = () => <LineBreak />;

  const keyExtract = (item: IResHistoryMeet) => item.connectId;

  return (
    <FlatList
      data={listHistoryMeet}
      renderItem={renderItem}
      keyExtractor={keyExtract}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={dataEmpty}
      ItemSeparatorComponent={seperator}
      style={{flex: 1}}
    />
  );
};
export default HistoryMeetScreen;
