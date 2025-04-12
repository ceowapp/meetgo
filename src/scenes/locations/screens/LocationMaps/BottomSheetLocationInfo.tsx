import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {EStatusLocation, LocationInfo} from 'scenes/locations/redux/type';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {perHeight, resFont, resWidth} from 'utils/Screen';
import {getSoftMenuBarHeight} from 'react-native-extra-dimensions-android';
import Platform from 'utils/Platform';
import {calculatePercentMeet, openMapApp} from 'utils/Utility';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SPACING} from 'utils/styleGuide';
import IconLocation from './IconLocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';
import {ButtonPrimary} from 'components/Button/Primary';
import FastImage from 'react-native-fast-image';
import {ProgressiveImage} from 'components/Image/ProgressiveImage';
type IPropsLocationInfo = {
  dataSelectedLocation: LocationInfo | null;
  onNavigateLocationDetail: () => void;
  onNavigateEarning: () => void;
};
enum EBottomValue {
  CLOSE = -1,
  OPEN = 1,
}

const BottomSheetLocationInfo: FC<IPropsLocationInfo> = ({
  dataSelectedLocation,
  onNavigateLocationDetail,
  onNavigateEarning,
}) => {
  const [index, setIndex] = useState(EBottomValue.CLOSE);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', 'CONTENT_HEIGHT'], []);

  useEffect(() => {
    if (dataSelectedLocation) {
      setIndex(EBottomValue.OPEN);
    }
  }, [dataSelectedLocation]);

  const onOpenMap = () => {
    if (dataSelectedLocation) {
      openMapApp(dataSelectedLocation.latitude, dataSelectedLocation.longitude);
    }
  };

  const onClose = useCallback(() => {
    setIndex(EBottomValue.CLOSE);
  }, []);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  const renderImageLocation = () => {
    if (!dataSelectedLocation?.imageShopLocation) return <></>;
    return (
      <ProgressiveImage
        source={{
          uri: dataSelectedLocation?.imageShopLocation,
        }}
        resizeMode="cover"
        style={styles.img}
      />
    );
  };
  const paddingWithoutImage = !dataSelectedLocation?.imageShopLocation
    ? 0
    : resWidth(40);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      enableOverDrag
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop}
      onClose={onClose}>
      <BottomSheetView
        onLayout={handleContentLayout}
        style={styles.bottomContainer}>
        {renderImageLocation()}
        <View
          style={[styles.addressContainer, {paddingTop: paddingWithoutImage}]}>
          {dataSelectedLocation?.statusLocation ? (
            <IconLocation
              statusLocation={dataSelectedLocation.statusLocation}
            />
          ) : (
            <View style={styles.iconContainer}>
              <Icon name="pin" color={COLORS.white} size={SPACING.m_16} />
            </View>
          )}
          <View style={{flex: 1}}>
            <Text style={styles.txtAddress} numberOfLines={2}>
              {dataSelectedLocation?.address}
            </Text>
            <View style={styles.containProperties}>
              <View style={styles.distanceContainer}>
                <Icon
                  name="map-marker-outline"
                  size={SPACING.m_16}
                  color="#8D8D8D"
                />
                <Text style={styles.txtProperties}>
                  {dataSelectedLocation?.distanceInKm ?? 'N/A'} km
                </Text>
              </View>
              <View style={{width: SPACING.s_8}} />
              <View style={styles.distanceContainer}>
                <Icon name="gift-outline" size={SPACING.m_16} color="#8D8D8D" />
                <View style={{width: SPACING.s_4}} />
                <Text style={styles.txtProperties}>
                  {dataSelectedLocation?.totalOfMeet
                    ? calculatePercentMeet(dataSelectedLocation.totalOfMeet)
                    : 0}
                  %
                </Text>
              </View>
              <View style={{width: SPACING.s_8}} />
              {dataSelectedLocation &&
                dataSelectedLocation.statusLocation ===
                  EStatusLocation.SHOP && (
                  <View style={styles.distanceContainer}>
                    <Icon name="cash" size={SPACING.m_16} color="#8D8D8D" />
                    <View style={{width: SPACING.s_4}} />
                    <Text style={styles.txtProperties}>
                      {dataSelectedLocation?.totalOfMeet
                        ? calculatePercentMeet(dataSelectedLocation.totalOfEarn)
                        : 0}
                      %
                    </Text>
                  </View>
                )}
            </View>
            <TouchableOpacity onPress={onNavigateLocationDetail}>
              <Text style={styles.txtDetail}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomBtnContainer}>
          <ButtonPrimary
            type="tiny"
            onPress={onOpenMap}
            containerStyle={styles.btnDirection}
            content={<Text style={styles.txtBtn}>Dẫn đường tới đây</Text>}
          />
          <View style={styles.w16} />
          {dataSelectedLocation &&
            dataSelectedLocation.statusLocation === EStatusLocation.SHOP && (
              <>
                <View style={styles.w16} />
                <ButtonPrimary
                  type="tiny"
                  containerStyle={styles.btnEarn}
                  onPress={onNavigateEarning}
                  content={<Text style={styles.txtBtn}>Earning</Text>}
                />
              </>
            )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetLocationInfo;
const styles = StyleSheet.create({
  bottomContainer: {
    padding: resWidth(40),
    paddingBottom: resWidth(40),
  },
  addressContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: COLORS.lightOrange,
    alignSelf: 'flex-start',
    padding: SPACING.s_4,
    borderRadius: SPACING.s_6,
    marginRight: SPACING.s_6,
  },
  white: {
    color: COLORS.white,
    fontSize: resFont(12),
    lineHeight: resWidth(14),
    fontFamily: 'Roboto',
  },
  txtPrimary: {
    color: COLORS.primary,
    fontSize: resFont(12),
    lineHeight: resWidth(14),
    fontFamily: 'Roboto',
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    width: '100%',
    aspectRatio: 1,
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: resWidth(18),
  },
  btnDirection: {
    paddingHorizontal: SPACING.s_8,
    paddingVertical: SPACING.s_6,
    flex: 1,
    height: resWidth(42),
    backgroundColor: COLORS.primary,
  },
  btnEarn: {
    paddingHorizontal: SPACING.s_8,
    paddingVertical: SPACING.s_6,
    flex: 1,
    height: resWidth(42),
    backgroundColor: COLORS.green,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  containProperties: {
    paddingHorizontal: SPACING.s_4,
    paddingVertical: SPACING.s_6,
    flexDirection: 'row',
  },
  txtProperties: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: resFont(12),
    lineHeight: resWidth(16),
  },
  txtBtn: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: resFont(12),
    lineHeight: resWidth(16),
    color: COLORS.white,
  },
  txtAddress: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: resFont(14),
    lineHeight: resWidth(16),
    color: COLORS.primary,
  },
  txtDetail: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontSize: resFont(12),
    lineHeight: resWidth(16),
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  w16: {
    width: SPACING.m_16,
  },
});
