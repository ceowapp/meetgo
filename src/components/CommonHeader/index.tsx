import React, {FC, ReactElement} from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
/**
 * Utils and constant
 */

import styles from './styles';
import {goBack} from 'navigation/RootNavigation';
import Screen, {resWidth} from 'utils/Screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';
import {COLORS} from 'utils/styleGuide';

export interface CommonHeaderProps {
  typeOfHeader?: 'POPUP_PAGE' | 'NAVIGATE_PAGE';
  title?: string;
  titleStyle?: TextStyle;
  linesOfTitle?: number | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  renderRight?: () => ReactElement;
  renderLeft?: () => ReactElement;
  onPressBtnDefaultLeft?: () => void;
}

function renderRightDefault() {
  return <></>;
}

function renderLeftDefault(
  typeOfHeader: string | undefined,
  onPressBtnDefaultLeft?: () => void,
) {
  const onPressBack = () => {
    if (onPressBtnDefaultLeft) return onPressBtnDefaultLeft();
    return goBack();
  };

  return (
    <TouchableOpacity
      onPress={onPressBack}
      hitSlop={Screen.hitSlop}
      style={[styles.wrapperIcon]}>
      {typeOfHeader === 'NAVIGATE_PAGE' ? (
        <Icon
          name="chevron-left"
          size={resWidth(24)}
          color={COLORS.primaryBlack}
        />
      ) : (
        <Icon
          name="close-circle-outline"
          size={resWidth(15)}
          color={COLORS.primaryBlack}
        />
      )}
    </TouchableOpacity>
  );
}

const CommonHeader: FC<CommonHeaderProps> = ({
  renderRight,
  renderLeft,
  title,
  titleStyle,
  typeOfHeader,
  containerStyle,
  onPressBtnDefaultLeft,
  linesOfTitle,
}): ReactElement => {
  const titleStyles = {...styles.textTitle, ...titleStyle};
  return (
    <View style={[styles.headerWrapper, containerStyle]}>
      <View style={styles.headerLeft}>
        {renderLeft
          ? renderLeft()
          : renderLeftDefault(typeOfHeader, onPressBtnDefaultLeft)}
      </View>
      <View style={styles.headerTitleWrapper}>
        <Text numberOfLines={linesOfTitle} style={titleStyles}>
          {title}
        </Text>
      </View>
      <View style={styles.headerRight}>
        {renderRight ? renderRight() : renderRightDefault()}
      </View>
    </View>
  );
};
export default CommonHeader;

CommonHeader.defaultProps = {
  typeOfHeader: 'NAVIGATE_PAGE',
  linesOfTitle: 1,
  renderLeft: undefined,
  renderRight: undefined,
  title: '',
  titleStyle: {},
  containerStyle: {},
  onPressBtnDefaultLeft: undefined,
};
