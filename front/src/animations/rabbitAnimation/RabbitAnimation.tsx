import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const RabbitAnimation = () => {
  const animatedValue = useRef(new Animated.Value(-300)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    const toValue = width / 2 - (Platform.OS === 'web' ? 150 : 100);
    Animated.timing(animatedValue, {
      toValue,
      useNativeDriver: false,
      duration: 2500,
    }).start();
  }, [width]);

  return (
    <Animated.Image
      source={{
        uri: 'https://media.tenor.com/YNm9Vo2rAlAAAAAi/bicycles-bikes.gif',
      }}
      style={[
        Platform.OS === 'web' ? styles.rabbitWeb : styles.rabbitMobile,
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
    position: 'absolute',
  },
  rabbitMobile: {
    width: 200,
    height: 200,
    bottom: 50,
  },
  rabbitWeb: {
    width: 300,
    height: 300,
    bottom: 100,
  },
});
