import LineBreak from 'components/LineBreak';
import React, {useEffect} from 'react';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';
import SectionEmpty from 'scenes/meets/components/SectionEmpty';
import SkeletonHistory from 'scenes/meets/components/SkeletonHistory';
import {SPACING} from 'utils/styleGuide';
import ItemHistory from './ItemHistory';
import useEarn from 'scenes/earn/helper/useEarn';
import {IDataEarn} from 'scenes/earn/redux/types';
import {resWidth} from 'utils/Screen';
import Container from 'components/Container';
import DialogModal from 'components/BaseModal/DialogModal';
import {
  showDialogModal,
  showEarnModal,
} from 'services/globalModal/modalHandler';
import EarnDetailDialog from './EarnDetailDialog';
import { useTranslation } from 'react-i18next';

const HistoryEarnScreen = () => {
  const { t } = useTranslation();
  const {historyEarn, loading, listDataEarn} = useEarn();

  useEffect(() => {
    historyEarn();
  }, []);

  const onRefresh = () => historyEarn();

  const dataEmpty = () => {
    if (loading) {
      return <SkeletonHistory />;
    }
    return <SectionEmpty message={t('earning.emptyMessage')} />;
  };

  const renderItem: ListRenderItem<IDataEarn> = ({item}) => (
    <ItemHistory item={item} onClick={showDetailEarn} />
  );
  const seperator = () => <View style={{height: SPACING.m_16}} />;

  const keyExtract = (_item: IDataEarn, index: number) => index.toString();
  const showDetailEarn = (item: IDataEarn) => {
    showEarnModal({
      content: () => <EarnDetailDialog dataEarn={item} />,
    });
  };
  return (
    <FlatList
      data={listDataEarn}
      renderItem={renderItem}
      keyExtractor={keyExtract}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={dataEmpty}
      ItemSeparatorComponent={seperator}
      style={{
        paddingHorizontal: SPACING.m_16,
      }}
      contentContainerStyle={{
        paddingVertical: resWidth(40),
      }}
    />
  );
};
export default HistoryEarnScreen;
