import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CommonHeader from 'components/CommonHeader';
import Container from 'components/Container';
import LineBreak from 'components/LineBreak';
import {AppStackParamList, STACK_NAVIGATOR} from 'navigation/types';
import React from 'react';
import {ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {perWidth, resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import {shadow} from 'utils/mixins';
import {ButtonPrimary} from 'components/Button/Primary';
import { useTranslation } from 'react-i18next';

const PreviewKyc = () => {
  const { t } = useTranslation();
  const {params} = useRoute<RouteProp<AppStackParamList, 'VERIFY_ACCOUNT'>>();
  const navigation = useNavigation();
  const {infoKyc} = params || {};
  const {bottom} = useSafeAreaInsets();
  const listImgKyc = [
    {
      img: infoKyc.storeUrlFrontID,
      content: t('account.IDPictureFront'),
    },
    {
      img: infoKyc.storeUrlBackID,
      content: t('account.IDPictureBehind'),
    },
    {
      img: infoKyc.storeUrlKycWithID,
      content: t('account.profilePicture'),
    },
  ];

  const navigateToUpdateKYC = () => {
    //@ts-ignore
    navigation.navigate(STACK_NAVIGATOR.VERIFY_ACCOUNT, {infoKyc});
  };
  return (
    <Container edges={['top']} style={{backgroundColor: COLORS.grey5}}>
      <CommonHeader
        title={t('account.authenInfo')}
        titleStyle={{color: COLORS.primaryBlack}}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingBottom: bottom,
        }}>
        <View
          style={{
            paddingHorizontal: SPACING.l_24,
            paddingVertical: SPACING.m_16,
          }}>
          <Text
            variant="headlineSmall"
            style={{
              textDecorationLine: 'underline',
            }}>
            Thông tin CCCD
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: SPACING.m_16,
            }}>
            <Text>Họ tên: </Text>
            <Text style={{fontWeight: 'bold'}}>{infoKyc?.fullname}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: SPACING.m_16,
            }}>
            <Text>Ngày sinh: </Text>
            <Text style={{fontWeight: 'bold'}}>{infoKyc?.birthday}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: SPACING.m_16,
            }}>
            <Text>Căn cước công dân: </Text>
            <Text style={{fontWeight: 'bold'}}>{infoKyc?.idnumber}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: SPACING.m_16,
            }}>
            <Text>Ngày cấp: </Text>
            <Text style={{fontWeight: 'bold'}}>{infoKyc?.idday}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: SPACING.m_16,
            }}>
            <Text>Nơi cấp: </Text>
            <Text style={{fontWeight: 'bold'}}>{infoKyc?.idnumber}</Text>
          </View>
        </View>
        <LineBreak />

        <Text
          variant="headlineSmall"
          style={{
            textDecorationLine: 'underline',
            padding: SPACING.m_16,
          }}>
          Hình ảnh CCCD
        </Text>
        <Carousel
          width={perWidth(100)}
          height={resWidth(220)}
          data={listImgKyc}
          mode="parallax"
          scrollAnimationDuration={1000}
          renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
              <FastImage
                source={{uri: item.img}}
                style={{
                  width: '100%',
                  height: resWidth(200),
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
              <Text variant="titleLarge" style={{paddingVertical: SPACING.s_8}}>
                {item.content}
              </Text>
            </View>
          )}
        />
      </ScrollView>
      <View
        style={{
          padding: SPACING.l_24,
          backgroundColor: COLORS.grey5,
          ...shadow('medium'),
        }}>
        <ButtonPrimary
          content={t('account.IDUpdate')}
          onPress={navigateToUpdateKYC}
        />
      </View>
    </Container>
  );
};
export default PreviewKyc;
