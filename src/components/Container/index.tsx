import React, {FC, ReactElement} from 'react';

import {StyleSheet} from 'react-native';
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from 'react-native-safe-area-context';
import colors from 'services/themes/colors';

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

type IContainerProps = NativeSafeAreaViewProps;
const Container: FC<IContainerProps> = ({
  children,
  style,
  ...rest
}): ReactElement => {
  return (
    <SafeAreaView style={[defaultStyles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
};

Container.defaultProps = {
  children: <></>,
  style: defaultStyles.container,
};
export default Container;
