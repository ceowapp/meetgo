import {StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {padding, shadow} from 'utils/mixins';
import Platform from 'utils/Platform';
import {perHeight, perWidth, resFont, resWidth} from 'utils/Screen';
import {COLORS, SPACING} from 'utils/styleGuide';

const styles = StyleSheet.create({
  header: {
    ...padding(SPACING.s_12, SPACING.l_24, SPACING.l_48, SPACING.l_24),
    backgroundColor: COLORS.transparent,
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: SPACING.l_24,
  },
  nameContainer: {
    flex: 1,
    height: resWidth(96),
    justifyContent: 'center',
  },
  name: {
    marginBottom: SPACING.s_8,
    color: COLORS.primaryWhite,
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: resFont(16),
    lineHeight: resWidth(18),
  },
  changeAvatar: {
    marginTop: SPACING.s_12,
    color: COLORS.primaryWhite,
    textDecorationLine: 'underline',
  },
  panel: {
    position: 'absolute',
    left: SPACING.m_16,
    right: SPACING.m_16,
    top: -SPACING.l_32,
    paddingHorizontal: SPACING.l_32,
    borderRadius: SPACING.s_12,
    backgroundColor: COLORS.primaryWhite,
    height: SPACING.xl_64,
    ...shadow('low'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: COLORS.grey3,
    width: 1,
    height: SPACING.l_32,
  },
  content: {
    backgroundColor: COLORS.primaryWhite,
    borderTopLeftRadius: SPACING.l_32,
    borderTopRightRadius: SPACING.l_32,
    paddingTop: SPACING.s_12,
    justifyContent: 'flex-end',
  },
  itemSeparator: {
    height: SPACING.s_8,
    backgroundColor: COLORS.grey4,
  },
  pointExpiryContainer: {
    marginTop: SPACING.s_12,
  },
  inbox: {
    height: SPACING.xl_72,
    width: '50%',
    paddingLeft: SPACING.l_32,
  },
  myReward: {
    width: '50%',
    height: SPACING.xl_72,
  },
  overlayHeader: {
    position: 'absolute',
    width: perWidth(100),
    height: perHeight(100),
  },
  container: {
    flexDirection: 'row',
    padding: SPACING.m_16,
    alignItems: 'center',
  },
  label: {
    marginLeft: SPACING.s_8,
    flex: 1,
  },
  txtPoint: {
    paddingRight: SPACING.s_4,
    color: COLORS.white,
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: resFont(14),
    lineHeight: resWidth(16),
  },
  sperateVertical: {
    paddingHorizontal: SPACING.s_8,
    color: COLORS.white,
  },
});

export default styles;
