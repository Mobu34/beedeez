import React, { useEffect, useRef } from 'react';
import { Color } from '../../enums';
import { Animated, StyleSheet, useWindowDimensions } from 'react-native';

const SPIN_DURATION = 1000;
const MOVE_DURATION = 3000;

const WheelAnimation = () => {
  const wheelAnimationSpin1 = useRef(new Animated.Value(0)).current;
  const wheelAnimationSpin2 = useRef(new Animated.Value(0)).current;
  const wheelAnimationSpin3 = useRef(new Animated.Value(0)).current;
  const wheelAnimationSpin4 = useRef(new Animated.Value(0)).current;

  const wheelAnimationVertical1 = useRef(new Animated.Value(-120)).current;
  const wheelAnimationHorizontal1 = useRef(new Animated.Value(-120)).current;

  const { height, width } = useWindowDimensions();

  const spin = () => {
    Animated.parallel([
      Animated.timing(wheelAnimationSpin1, {
        toValue: 1,
        useNativeDriver: true,
        duration: SPIN_DURATION,
      }),
      Animated.timing(wheelAnimationSpin2, {
        toValue: 1,
        useNativeDriver: true,
        duration: SPIN_DURATION,
      }),
      Animated.timing(wheelAnimationSpin3, {
        toValue: 1,
        useNativeDriver: true,
        duration: SPIN_DURATION,
      }),
      Animated.timing(wheelAnimationSpin4, {
        toValue: 1,
        useNativeDriver: true,
        duration: SPIN_DURATION,
      }),
    ]).start(() => {
      wheelAnimationSpin1.setValue(0);
      wheelAnimationSpin2.setValue(0);
      wheelAnimationSpin3.setValue(0);
      wheelAnimationSpin4.setValue(0);
      spin();
    });
  };

  const move = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(wheelAnimationVertical1, {
            toValue: height,
            useNativeDriver: true,
            duration: MOVE_DURATION,
          }),
          Animated.timing(wheelAnimationHorizontal1, {
            toValue: width / 4 + 120,
            useNativeDriver: true,
            duration: MOVE_DURATION,
          }),
        ]),
        Animated.parallel([
          Animated.timing(wheelAnimationVertical1, {
            toValue: -120,
            useNativeDriver: true,
            duration: MOVE_DURATION,
          }),
          Animated.timing(wheelAnimationHorizontal1, {
            toValue: width / 2 + 240,
            useNativeDriver: true,
            duration: MOVE_DURATION,
          }),
        ]),
        Animated.parallel([
          Animated.timing(wheelAnimationVertical1, {
            toValue: height,
            useNativeDriver: true,
            duration: MOVE_DURATION,
          }),
          Animated.timing(wheelAnimationHorizontal1, {
            toValue: width / 1,
            useNativeDriver: true,
            duration: MOVE_DURATION,
          }),
        ]),
      ]),
    ).start();
  };

  useEffect(() => {
    spin();
    move();
  }, []);

  const rotating1 = wheelAnimationSpin1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotating2 = wheelAnimationSpin1.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '405deg'],
  });
  const rotating3 = wheelAnimationSpin1.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '450deg'],
  });
  const rotating4 = wheelAnimationSpin1.interpolate({
    inputRange: [0, 1],
    outputRange: ['135deg', '495deg'],
  });

  return (
    <Animated.View
      style={[
        styles.wheel,
        {
          top: wheelAnimationVertical1,
          left: wheelAnimationHorizontal1,
        },
      ]}>
      <Animated.View
        style={[
          styles.spoke,
          {
            transform: [{ rotate: rotating1 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.spoke,
          {
            transform: [{ rotate: rotating2 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.spoke,
          {
            transform: [{ rotate: rotating3 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.spoke,
          {
            transform: [{ rotate: rotating4 }],
          },
        ]}
      />
    </Animated.View>
  );
};

export default WheelAnimation;

const styles = StyleSheet.create({
  wheel: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.TERTIARY,
    position: 'absolute',
  },
  spoke: {
    borderWidth: 1,
    width: '100%',
    position: 'absolute',
  },
});
