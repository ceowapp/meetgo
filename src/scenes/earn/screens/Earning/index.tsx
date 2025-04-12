import React, {useEffect, useRef} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamList} from 'navigation/types';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {resFont, resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';
import BtnStartEarn from './BtnStartEarn';
import FastImage from 'react-native-fast-image';
import Images from 'utils/Images';
import Container from 'components/Container';
import CommonHeader from 'components/CommonHeader';
import useEarn from 'scenes/earn/helper/useEarn';
import {IReqCurrentEarn} from 'scenes/earn/redux/types';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import {hideModal, showDialogModal} from 'services/globalModal/modalHandler';
import WarningDialog from 'scenes/meets/screens/MeetTogether/WarningDialog';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: resWidth(40),
    backgroundColor: COLORS.white,
    flex: 1,
  },
  address: {
    paddingTop: resWidth(36),
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: resFont(12),
    lineHeight: resWidth(16),
    color: COLORS.primary,
    textAlign: 'center',
  },
  owner: {
    fontFamily: 'Roboto-bold',
    fontWeight: '700',
    fontSize: resFont(14),
    lineHeight: resWidth(16),
    color: COLORS.primary,
    paddingTop: SPACING.s_8,
  },
  img: {
    width: '100%',
    aspectRatio: 1,
  },
  txtHeader: {
    color: COLORS.primary,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: resFont(14),
    lineHeight: resWidth(16),
  },
  containerHeader: {
    backgroundColor: '#E5E5E5',
  },
});
const EarningScreen = () => {
  useKeepAwake();
  const navigation = useNavigation();
  const {params} = useRoute<RouteProp<AppStackParamList, 'EARN'>>();
  const {cancelEarn} = useEarn();
  const refEarn = useRef<IReqCurrentEarn & {makeDone: boolean}>();
  const isConfirmBackRef = useRef(false);
  const onSetDataEarn = (data: IReqCurrentEarn & {makeDone: boolean}) => {
    refEarn.current = data;
  };
  const onPressBack = () => {
    if (
      refEarn.current?.earnID &&
      !refEarn.current.makeDone &&
      isConfirmBackRef.current
    ) {
      cancelEarn(refEarn.current);
    }
    navigation.goBack();
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (
        !isConfirmBackRef.current &&
        refEarn.current?.earnID &&
        !refEarn.current.makeDone
      ) {
        onWarningBack();
        e.preventDefault();
      } else {
        navigation.dispatch(e.data.action);
        hideModal();
      }
    });
  }, []);

  const onWarningBack = () => {
    const title = `Nếu bạn thoát ra,\n kết quả Earning sẽ không được ghi nhận`;
    const description = 'Bạn vẫn muốn thoát?';
    showDialogModal({
      content: () => (
        <WarningDialog
          onContinue={hideModal}
          onExit={onFinishBack}
          title={title}
          description={description}
          source={Images.earn.earnExit}
        />
      ),
    });
  };

  const onFinishBack = () => {
    isConfirmBackRef.current = true;
    onPressBack();
  };
  return (
    <Container style={styles.container} edges={['top']}>
      <CommonHeader
        title="Earning"
        titleStyle={styles.txtHeader}
        containerStyle={styles.containerHeader}
        onPressBtnDefaultLeft={onPressBack}
      />
      <View style={styles.contentContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.address}>{params.address}</Text>
          <Text style={styles.owner}>{params.owner}</Text>
        </View>
        <BtnStartEarn
          locationID={params.locationID}
          onSetDataEarn={onSetDataEarn}
          propsEarn={params.dataEarn}
        />
        <FastImage
          source={Images.earn.background}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
    </Container>
  );
};
export default EarningScreen;
