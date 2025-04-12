import React, {memo, useMemo, FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {Extrapolate, interpolateNode} from 'react-native-reanimated';
import {COLORS, SPACING} from 'utils/styleGuide';

interface Props {
  total: number;
  index: Animated.Node<number>;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const DOT_SIZE = SPACING.s_8;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    marginHorizontal: SPACING.s_6,
    borderRadius: 9999,
    height: DOT_SIZE,
    width: DOT_SIZE,
    backgroundColor: COLORS.primary,
  },
});
const CarouselDot: FC<Props> = ({
  total,
  index,
  color = COLORS.primary,
  containerStyle,
}) => {
  const step: number[] = [];
  for (let i = 0; i < total; i += 1) step.push(i);

  const calculateDot = useMemo(() => {
    return step.map(value => {
      const inputRange = [value - 1, value, value + 1];
      // const dotScale = interpolateNode(index, {
      //   inputRange,
      //   outputRange: [1, 1.25, 1],
      //   extrapolate: Extrapolate.CLAMP,
      // });

      const dotOpacity = interpolateNode(index, {
        inputRange,
        outputRange: [0.4, 0.4, 0.4],
        extrapolate: Extrapolate.CLAMP,
      });
      const animateStyles = [
        styles.dot,
        {
          backgroundColor: color,
          opacity: dotOpacity,
          // transform: [
          //   {
          //     scale: dotScale,
          //   },
          // ],
        },
      ];
      return <Animated.View style={animateStyles} key={value} />;
    });
  }, [total, index]);

  return <View style={[styles.container, containerStyle]}>{calculateDot}</View>;
};

export default memo(CarouselDot);
