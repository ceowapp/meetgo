import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  RefreshControl,
  View,
} from 'react-native';
import HeaderSearch from './HeaderSearch';
import {PermissionStatus, RESULTS} from 'react-native-permissions';
import {Permission as PermissionApp} from 'manager/appPermission';
import SectionCheckLocation from './SectionCheckLocation';
import SectionBlockedLocation from './SectionBlockedLocation';
import useLocation from 'scenes/locations/helper/useLocation';
import SectionEmptyLocation from './SectionEmptyLocation';
import {IResNearByMe} from 'scenes/locations/redux/type';
import SkeletonLocation from './SkeletonLocation';
import ItemLocation from './ItemLocation';
import LineBreak from 'components/LineBreak';
import {useScrollToTop} from '@react-navigation/native';
import {useAppSelector} from 'storeConfig/hook';
import {appStateSelector} from 'services/appstate/slice';

const LocationNFTScreens = () => {
  const [resultPermission, setResultPermission] = useState<PermissionStatus>();
  const appState = useAppSelector(appStateSelector.getAppState);
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);
  const {
    loading,
    listLocationNear,
    onLoadMore,
    currentMetaPage,
    onSearch,
    getLocationNearByMe,
  } = useLocation();
  const callOnEndReached = useRef<boolean>(false);

  const checkPermissionLocation = async () => {
    const result = await PermissionApp.checkPermission('location');
    setResultPermission(result);
  };

  useLayoutEffect(() => {
    if (appState === 'active') {
      checkPermissionLocation();
    }
  }, [appState]);

  useEffect(() => {
    if (resultPermission === RESULTS.GRANTED) {
      getLocationNearByMe(1);
    }
  }, [resultPermission]);

  const onRefresh = () => {
    getLocationNearByMe(1);
  };

  const onBeginScroll = () => {
    callOnEndReached.current = true;
  };
  const handleLoadMore = () => {
    if (callOnEndReached.current) {
      onLoadMoreLocation();
      callOnEndReached.current = false;
    }
  };
  const onLoadMoreLocation = useCallback(() => {
    onLoadMore(currentMetaPage.currentPage);
  }, [currentMetaPage]);

  if (resultPermission === RESULTS.DENIED || resultPermission === undefined) {
    return <SectionCheckLocation setResultPermission={setResultPermission} />;
  }
  if (resultPermission !== RESULTS.GRANTED) {
    return (
      <SectionBlockedLocation
        setResultPermission={setResultPermission}
        resultPermission={resultPermission}
      />
    );
  }

  const dataEmpty = () => {
    if (loading) {
      return <SkeletonLocation />;
    }
    return <SectionEmptyLocation />;
  };

  const renderItem: ListRenderItem<IResNearByMe> = ({item}) => (
    <ItemLocation item={item} />
  );
  const seperator = () => <LineBreak />;

  const keyExtract = (item: IResNearByMe) => item.id || item.key;

  const hideKeyboard = () => Keyboard.dismiss();
  return (
    <View style={{flex: 1}}>
      <HeaderSearch onSearch={onSearch} />
      <FlatList
        ref={flatListRef}
        data={listLocationNear}
        renderItem={renderItem}
        keyExtractor={keyExtract}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        onScrollBeginDrag={onBeginScroll}
        onMomentumScrollBegin={onBeginScroll}
        onResponderStart={hideKeyboard}
        ListEmptyComponent={dataEmpty}
        ItemSeparatorComponent={seperator}
        style={{flex: 1}}
        onEndReached={handleLoadMore}
      />
    </View>
  );
};
export default LocationNFTScreens;
