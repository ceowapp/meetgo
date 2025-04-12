import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ButtonPrimary} from 'components/Button/Primary';
import InputNormal from 'components/Input/InputNormal';
import {AppStackParamList} from 'navigation/types';
import React, {memo, useLayoutEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Text} from 'react-native-paper';
import Platform from 'utils/Platform';
import {resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import {openMapApp} from 'utils/Utility';
import IconLocation from '../LocationMaps/IconLocation';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.onSecondary},
  contentContainer: {
    paddingTop: SPACING.l_24,
    paddingHorizontal: SPACING.l_24,
  },
  containerMap: {
    width: '100%',
    padding: SPACING.s_12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SPACING.s_4,
    marginBottom: SPACING.s_12,
  },
  borderMap: {
    paddingTop: SPACING.s_8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: resWidth(200),
  },
  map: {
    width: '100%',
    aspectRatio: 1,
  },
  mapTitle: {
    paddingBottom: SPACING.s_12,
  },
  flex1: {flex: 1},
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.l_24,
    backgroundColor: COLORS.onSecondary,
  },
  space16: {width: SPACING.m_16},
});
const LocationDetail = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {params} = useRoute<RouteProp<AppStackParamList, 'LOCATION_DETAIL'>>();
  const {locationData, regionCenter} = params || {};
  useLayoutEffect(() => {
    navigation.setOptions({
      title: locationData?.address || '',
    });
  }, []);

  const onOpenMap = () => {
    openMapApp(locationData.latitude, locationData.longitude);
  };

  const regionMap = {
    latitude: regionCenter?.latitude,
    longitude: regionCenter?.longitude,
    longitudeDelta: 0.03,
    latitudeDelta: 0.03,
  };

  const renderMap = () => {
    return (
      <View style={styles.containerMap} pointerEvents="none">
        <Text variant="titleMedium" style={styles.mapTitle}>
          {t('location.map_image_area')}
        </Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.borderMap}
          loadingIndicatorColor={COLORS.secondary}
          loadingBackgroundColor={COLORS.secondary}
          region={regionMap}>
          <Marker
            tracksViewChanges={Platform.isIos ? true : false}
            coordinate={locationData}>
            <IconLocation statusLocation={locationData.statusLocation} />
          </Marker>
        </MapView>
      </View>
    );
  };
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {renderMap()}
        <InputNormal
          label={t('location.place_name')}
          value={locationData.visionAddress || locationData?.address}
          outlineStyle={{
            borderColor: COLORS.primary,
          }}
          multiline
          editable={false}
        />
        <InputNormal
          label={t('location.owner')}
          value={locationData?.owner}
          outlineStyle={{
            borderColor: COLORS.primary,
          }}
          editable={false}
        />
        <InputNormal
          label={t('location.latitude')}
          value={locationData?.latitude?.toString()}
          outlineStyle={{
            borderColor: COLORS.primary,
          }}
          editable={false}
        />
        <InputNormal
          label={t('location.longitude')}
          value={locationData?.longitude?.toString()}
          outlineStyle={{
            borderColor: COLORS.primary,
          }}
          editable={false}
        />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <ButtonPrimary
        content={t('location.direction')}
          onPress={onOpenMap}
          containerStyle={styles.flex1}
        />
        <View style={styles.space16} />
        <ButtonPrimary
          content={t('location.view_on_explorer')}
          onPress={() => {}}
          containerStyle={styles.flex1}
        />
      </View>
    </>
  );
};
export default LocationDetail;
