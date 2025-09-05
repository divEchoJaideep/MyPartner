import React from 'react';
import Animated from 'react-native-reanimated';

const CardWrap = React.forwardRef(
  ({style, children, cardContainerStyle, ...rest}, ref) => {
    return (
      <Animated.View
        {...{style: [style, cardContainerStyle]}}
        {...rest}
        ref={ref}>
        {children}
      </Animated.View>
    );
  },
);

export default CardWrap;
