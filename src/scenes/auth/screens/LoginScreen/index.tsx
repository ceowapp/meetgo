import React, {ReactElement} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Animated, {
  divide,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';
/** Component */
import CarouselDot from 'components/CarouselDot';
import Container from 'components/Container';
/** Utils and other */
import {COLORS, SPACING} from 'utils/styleGuide';
import styles, {SLIDER_WIDTH} from './styles';
import Images from 'utils/Images';
import {Text} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import useAuth from 'scenes/auth/helper/useAuth';
import Platform from 'utils/Platform';
import FastImage from 'react-native-fast-image';
import {perWidth, resWidth} from 'utils/Screen';
import { useTranslation } from 'react-i18next';

GoogleSignin.configure();

const widthContainerDot = perWidth(100);
const Intro = (): ReactElement => {
  const { t } = useTranslation();
  const translateX = useSharedValue(0);
  const index = divide(translateX.value, SLIDER_WIDTH);
  const {onSignInApple, onSignInGoogle, onSiginAndroidApple, loading} =
    useAuth();

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = (event.contentOffset.x / widthContainerDot) * (12 + 10);
  });
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const INTRO = [
    {
      mode: 'light',
      bgColor: COLORS.tertiary,
      content: t('login.intro1Content'),
      image: Images.intro.intro1,
      key: 'intro1',
    },
    {
      mode: 'light',
      bgColor: COLORS.primaryYellow,
      content: t('login.intro2Content'),
      image: Images.intro.intro2,
      key: 'intro2',
    },
  ];

  return (
    <Container edges={['top']} style={styles.container}>
      <Animated.ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {INTRO.map(({key, image, content, mode}) => {
          return (
            <View key={key} style={styles.slideContainer}>
              <Image
                source={image}
                style={styles.sliderImage}
                resizeMode="contain"
              />
              <Text
                variant="headlineSmall"
                // @ts-ignore
                style={[styles.description, styles[`${mode}Description`]]}>
                {content}
              </Text>
            </View>
          );
        })}
      </Animated.ScrollView>
      <View
        style={{
          width: 20 * INTRO.length,
          top: 10,
          alignSelf: 'center',
        }}>
        <Animated.View
          style={[
            {
              borderRadius: 9999,
              height: resWidth(12),
              width: resWidth(12),
              backgroundColor: COLORS.primary,
            },
            stylez,
          ]}
        />
      </View>
      <CarouselDot
        total={INTRO.length}
        index={index}
        containerStyle={styles.dotContainer}
      />
      <LinearGradient
        colors={[COLORS.white, COLORS.primary]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          flex: 2,
          alignItems: 'center',
        }}>
        <Text
          variant="titleMedium"
          style={{paddingVertical: SPACING.l_32, color: COLORS.primaryBlack}}>
          Đăng nhập bằng:
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
            }}
            disabled={loading}
            onPress={onSignInGoogle}>
            <FastImage
              source={Images.icon.logoGoogle}
              resizeMode="contain"
              style={{
                width: '100%',
                aspectRatio: 1,
                opacity: loading ? 0.5 : 1,
              }}
            />
          </TouchableOpacity>
          <View style={{width: SPACING.l_48}} />
          <TouchableOpacity
            style={{width: 44, height: 44}}
            disabled={loading}
            onPress={Platform.isIos ? onSignInApple : onSiginAndroidApple}>
            <FastImage
              source={Images.icon.logoApple}
              resizeMode="contain"
              style={{
                width: '100%',
                aspectRatio: 1,
                opacity: loading ? 0.5 : 1,
              }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Container>
  );
};

export default Intro;
