import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const AnimatedEllipsis = ({numberOfDots = 3, animationDelay = 200, style}) => {
  const [opacityValues] = useState(() =>
    Array.from({length: numberOfDots}, () => new Animated.Value(0)),
  );

  useEffect(() => {
    const animate = () => {
      Animated.sequence(
        opacityValues.map((value, index) =>
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0.5,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.delay(animationDelay), // Delay before animating the next dot
          ]),
        ),
      ).start(animate);
    };

    animate();

    // Cleanup function to clear the animation
    return () => {
      Animated.sequence(
        opacityValues.map(value => Animated.timing(value)),
      ).stop();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <View style={[styles.container]}>
      {opacityValues.map((value, index) => (
        <Animated.Text
          key={index}
          style={[styles.dot, style, {opacity: value}]}>
          .
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dot: {
    fontSize: 20,
    color: 'black', // Customize dot color here
    marginHorizontal: 2, // Adjust spacing between dots as needed
  },
});

export default AnimatedEllipsis;
