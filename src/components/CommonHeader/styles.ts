import {StyleSheet} from 'react-native';

import {perWidth, resFont, resWidth} from 'utils/Screen';
import {COLORS} from 'utils/styleGuide';

const HEADER_HEIGHT = resWidth(60);
const MIN_HEIGHT = resWidth(44);
const Styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    minHeight: MIN_HEIGHT,
  },
  headerLeft: {
    width: perWidth(20),
    justifyContent: 'flex-end',
    paddingLeft: resWidth(24),
  },
  headerRight: {
    width: perWidth(20),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerTitleWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  /** TEXT */
  textTitle: {
    fontSize: resFont(18),
    lineHeight: resWidth(21),
    color: COLORS.white,
    textAlign: 'center',
  },
  wrapperIcon: {
    width: resWidth(31),
    height: resWidth(31),
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey4,
  },
});
export default Styles;
