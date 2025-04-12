import {StyleSheet} from 'react-native';
import Screen, {perWidth, resWidth, perHeight} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';

export const SLIDER_WIDTH = perWidth(100);
export const CIRCLE_SIZE = perWidth(74);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: COLORS.transparent,
  },
  btnSkip: {
    height: resWidth(22),
    marginTop: resWidth(44),
    paddingRight: SPACING.l_24,
    marginBottom: SPACING.l_32,
  },
  slideContainer: {
    width: SLIDER_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    height: perHeight(30),
    aspectRatio: 1,
  },
  description: {
    textAlign: 'center',
    paddingTop: SPACING.l_32,
    lineHeight: resWidth(38),
    color: COLORS.lightOrange,
  },
  dotContainer: {
    marginBottom: resWidth(40),
  },
  overlayContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  overlaySlide: {
    width: Screen.width,
  },
  darkDescription: {
    color: COLORS.primaryWhite,
  },
});

export default styles;
