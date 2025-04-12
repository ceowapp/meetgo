import React, {useEffect} from 'react';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import {ButtonPrimary} from 'components/Button/Primary';
import Container from 'components/Container';
import LineBreak from 'components/LineBreak';
import Logo from 'components/Logo';
import {goBack, navigateScreen} from 'navigation/RootNavigation';
import {AppStackParamList, STACK_NAVIGATOR} from 'navigation/types';
import {ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {shadow} from 'utils/mixins';
import {perWidth, resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import {useMeet} from 'scenes/meets/helper/useMeet';
import {useAppSelector} from 'storeConfig/hook';
import {locationSelector} from 'services/location/slice';
import {AccountSelector} from 'scenes/account/redux/slice';
import {showDialogModal} from 'services/globalModal/modalHandler';
import WarningMeetDialog from './WarningMeetDialog';
import { useTranslation } from 'react-i18next';

const UserScan = () => {
  const { t } = useTranslation();
  const {params} = useRoute<RouteProp<AppStackParamList, 'USER_SCAN'>>();
  const {qrInfo} = params || {};
  const {
    loading,
    inviteMeetUser,
    connectId,
    getListLocationMeetNearByMe,
    listLocationNearBy,
    dataHistoryOlderMeet,
    checkMeetAgain,
  } = useMeet();
  const currentLocation = useAppSelector(locationSelector.getCurentLocation);
  const numberMeet = useAppSelector(AccountSelector.getNumberOfMeet);
  const dataFakeLocation = useAppSelector(locationSelector.getDataFakeLocation);
  const isFocus = useIsFocused();
  const hasLocationNearBy =
    (listLocationNearBy.length > 0 || dataFakeLocation) && numberMeet > 0;
  useEffect(() => {
    checkMeetAgain(qrInfo.account);
  }, [isFocus]);
  useEffect(() => {
    if (connectId) {
      navigateScreen(STACK_NAVIGATOR.MEET_TOGETHER, {
        connectId,
      });
    }
  }, [connectId]);

  const onInviteMeetUser = () => {
    inviteMeetUser(
      qrInfo.account,
      currentLocation?.latitude || 0,
      currentLocation?.longitude || 0,
      dataFakeLocation,
    );
  };
  const onInviteMeetTogether = () => {
    if (
      (currentLocation?.latitude && currentLocation.longitude) ||
      dataFakeLocation
    ) {
      if (dataHistoryOlderMeet && dataHistoryOlderMeet?.listMeet.length > 0) {
        showDialogModal({
          content: () => (
            <WarningMeetDialog
              data={dataHistoryOlderMeet.listMeet[0]}
              fullName={`${qrInfo.firstname} ${qrInfo.lastname}`}
              onInviteMeetUser={onInviteMeetUser}
              rateBonusAgain={dataHistoryOlderMeet.rateBonusAgain || 0}
            />
          ),
        });
      } else {
        onInviteMeetUser();
      }
    }
  };

  useEffect(() => {
    if (currentLocation?.latitude && currentLocation.longitude) {
      getListLocationMeetNearByMe(currentLocation);
    }
  }, [currentLocation]);

  const renderAvatar = () => {
    const hasName = !qrInfo.firstname || !qrInfo.lastname;
    return (
      <View
        style={{
          paddingVertical: SPACING.l_24,
          alignItems: 'center',
        }}>
        {qrInfo.photo ? (
          <Avatar.Image source={{uri: qrInfo.photo}} size={resWidth(96)} />
        ) : (
          <Logo size={resWidth(96)} />
        )}
        <Text variant="headlineMedium" style={{color: 'white'}}>
          {!hasName ? `${qrInfo.firstname} ${qrInfo.lastname}` : 'Meeter'}
        </Text>
      </View>
    );
  };

  const renderRowInfo = (iconName: string, value: string) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: SPACING.l_24,
      }}>
      <View
        style={{
          width: SPACING.l_32,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.primary,
          borderRadius: SPACING.l_48,
        }}>
        <Icon name={iconName} size={resWidth(20)} color={'white'} />
      </View>
      <View
        style={{
          paddingLeft: SPACING.m_16,
          flex: 1,
        }}>
        <Text
          variant="titleMedium"
          style={{
            color: COLORS.inverseOnSurface,
            marginBottom: SPACING.s_12,
          }}>
          {value}
        </Text>
        <LineBreak
          styleLine={{
            borderStyle: 'solid',
            borderColor: COLORS.grey3,
          }}
        />
      </View>
    </View>
  );

  const renderUserInfo = () => {
    return (
      <View
        style={{
          width: perWidth(100) - SPACING.l_24 * 2,
          backgroundColor: COLORS.backgroundBlack30,
          borderRadius: SPACING.m_16,
          padding: SPACING.l_24,
        }}>
        {renderRowInfo('phone', qrInfo.mobilenumber || t('meets.phone_not_updated'))}
        {/* {renderRowInfo('email', qrInfo.email || 'Chưa cập nhật')} */}
        {/* {renderRowInfo('calendar', qrInfo.birthday || 'Chưa cập nhật')} */}
        {renderRowInfo(
          'account',
          (qrInfo.gender && qrInfo.gender === 'male' ? t('meets.gender_male') : t('meets.gender_female')) ||
            t('meets.gender_not_updated'),
        )}
      </View>
    );
  };

  const bottomContainer = () => (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: SPACING.l_24,
        alignItems: 'center',
        ...shadow('medium'),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...shadow('medium'),
        }}>
        <ButtonPrimary
          content={
            <Icon
              size={SPACING.l_32}
              name="chevron-left"
              color={COLORS.white}
            />
          }
          onPress={goBack}
          containerStyle={{
            flex: 1,
            backgroundColor: COLORS.grey2,
          }}
        />
        <View style={{width: SPACING.m_16}} />
        <ButtonPrimary
          content={t('meets.button_connect_meet')}
          isLoading={loading}
          disabled={!hasLocationNearBy}
          onPress={onInviteMeetTogether}
          containerStyle={{flex: 4}}
        />
      </View>
      {numberMeet < 1 && (
        <Text
          style={{
            color: COLORS.darkRed,
            paddingTop: SPACING.s_8,
            fontStyle: 'italic',
          }}>
          {t('meets.no_meet_left')}
        </Text>
      )}
    </View>
  );

  const renderNearLocation = () => {
    const iconNearBy = hasLocationNearBy
      ? 'map-marker-check-outline'
      : 'map-marker-off-outline';
    const colorNearBy = hasLocationNearBy ? COLORS.darkGreen : COLORS.darkRed;
    const contentNearBy = hasLocationNearBy
      ? t('meets.nearby_location', {
          location: dataFakeLocation
            ? dataFakeLocation.addressNFT
            : listLocationNearBy[0]?.address || '',
        })
      : t('meets.no_nearby_location');
    return (
      <View
        style={{
          backgroundColor: COLORS.backgroundWhite70,
          padding: SPACING.m_16,
          borderRadius: SPACING.m_16,
          flexDirection: 'row',
        }}>
        <Icon name={iconNearBy} size={SPACING.l_24} color={colorNearBy} />
        <Text
          variant="labelSmall"
          style={{flex: 1, marginLeft: SPACING.s_4}}
          numberOfLines={2}>
          {contentNearBy}
        </Text>
      </View>
    );
  };
  return (
    <Container edges={['top']}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.white]}
        start={{x: 0.0, y: 0.5}}
        end={{x: 0, y: 1}}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: SPACING.l_24,
            paddingVertical: SPACING.m_16,
          }}>
          {renderNearLocation()}
          {renderAvatar()}
          {renderUserInfo()}
        </ScrollView>
      </LinearGradient>
      {bottomContainer()}
    </Container>
  );
};
export default UserScan;
