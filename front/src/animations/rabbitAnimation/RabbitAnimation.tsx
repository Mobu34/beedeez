import { StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const RabbitAnimation = () => {
  const animatedValue = useRef(new Animated.Value(-300)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: width / 2 - 150,
      useNativeDriver: false,
      duration: 2500,
    }).start();
  }, []);

  return (
    <Animated.Image
      source={{
        uri: 'https://media.tenor.com/YNm9Vo2rAlAAAAAi/bicycles-bikes.gif',
      }}
      style={[
        styles.rabbit,
        {
          right: animatedValue,
        },
      ]}
    />
  );
};

export default RabbitAnimation;

const styles = StyleSheet.create({
  rabbit: {
    width: 300,
    height: 300,
    position: 'absolute',
    bottom: 120,
  },
});
