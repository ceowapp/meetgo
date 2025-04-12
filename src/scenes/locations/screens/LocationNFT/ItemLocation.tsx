import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import {EStatusLocation, IResNearByMe} from 'scenes/locations/redux/type';
import {COLORS, SPACING} from 'utils/styleGuide';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from 'utils/Images';
import {useNavigation} from '@react-navigation/native';
import {STACK_NAVIGATOR} from 'navigation/types';
import {perWidth} from 'utils/Screen';

type IProps = {
  item: IResNearByMe;
};

const styles = StyleSheet.create({
  owner: {
    backgroundColor: COLORS.tertiary,
    padding: SPACING.s_6,
    marginTop: SPACING.s_4,
    borderRadius: SPACING.s_4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    backgroundColor: COLORS.tertiary,
    padding: SPACING.s_6,
    marginLeft: SPACING.s_6,
    marginTop: SPACING.s_4,
    borderRadius: SPACING.s_4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: SPACING.l_48,
    height: SPACING.l_48,
    marginLeft: SPACING.m_16,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  shop: {
    backgroundColor: COLORS.green,
    padding: SPACING.s_6,
    marginLeft: SPACING.s_6,
    marginTop: SPACING.s_4,
    borderRadius: SPACING.s_4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const ItemLocation: FC<IProps> = ({item}) => {
  const {navigate} = useNavigation();
  const navigateMap = () => {
    //@ts-ignore
    navigate(STACK_NAVIGATOR.LOCATION_MAP, {
      locationNFT: item,
    });
  };

  const onNavigateEarning = () => {
    // @ts-ignore
    navigate(STACK_NAVIGATOR.EARN, {
      locationID: item?.id,
      address: item?.address,
      owner: item?.owner,
    });
  };

  const renderIconType = () => {
    let iconImage = Images.icon.locationBuy;
    if (item.statusLocation === EStatusLocation.SHOP) {
      iconImage = Images.icon.locationShop;
    } else if (item.statusLocation === EStatusLocation.PENDING) {
      iconImage = Images.icon.locationPending;
    }
    return (
      <View style={styles.iconContainer}>
        <Image source={iconImage} resizeMode="contain" style={styles.img} />
      </View>
    );
  };
  const description = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.owner}>
          <Icon name="account-outline" size={16} color={'white'} />
          <Text
            variant="labelSmall"
            numberOfLines={1}
            style={{
              color: 'white',
              maxWidth: perWidth(30),
            }}>
            {item.owner}
          </Text>
        </View>
        <View style={styles.distance}>
          <Text
            variant="labelSmall"
            style={{
              color: 'white',
            }}>
            {item.distanceInKm} km
          </Text>
        </View>
        {item.statusLocation === EStatusLocation.SHOP && (
          <TouchableOpacity style={styles.shop} onPress={onNavigateEarning}>
            <Text
              variant="labelSmall"
              style={{
                color: 'white',
              }}>
              Earning
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <List.Item
      title={item.visionAddress || item.address}
      titleNumberOfLines={2}
      description={description}
      descriptionStyle={{
        paddingTop: SPACING.s_4,
      }}
      left={renderIconType}
      onPress={navigateMap}
    />
  );
};
export default ItemLocation;
