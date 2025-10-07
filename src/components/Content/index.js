import React from 'react';
import { Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';

class Content extends React.Component {
  scrollviewRef;
  rootRef;

  constructor(props) {
    super(props);
  }



  getStyle = () => {
    const { style } = this.props;
    const tmpStyle = [styles.content];
    if (style) tmpStyle.push(style);
    return tmpStyle;
  };

  getContentContainerStyle = () => {
    const { contentContainerStyle, hasHeader } = this.props;
    const styleArr = [styles.contentContainerStyle];
    if (contentContainerStyle) styleArr.push(contentContainerStyle);
    if (hasHeader === false) styleArr.push({ paddingTop: 0 });
    return styleArr;
  };

  render() {
    const {
      children,
      extraScrollHeight,
      showsVerticalScrollIndicator,
      disableKBDismissScroll,
      keyboardShouldPersistTaps,
      scrollEnabled,
      onScroll,
      scrollEventThrottle,
      isBottomSheet,
      style,
      contentContainerStyle,
    } = this.props;

    const ScrollComponent = isBottomSheet ? ScrollView : KeyboardAwareScrollView;

    return (
      <ScrollComponent
        enableResetScrollToCoords
        scrollEnabled={scrollEnabled !== false}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        resetScrollToCoords={disableKBDismissScroll ? undefined : { x: 0, y: 0 }}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
        ref={(c) => {
          this.scrollviewRef = c;
          this.rootRef = c;
        }}
        style={this.getStyle()}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle || 16}
        contentContainerStyle={this.getContentContainerStyle()}
        extraScrollHeight={extraScrollHeight || 20} 
        showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}
      >
        {children}
      </ScrollComponent>
    );
  }
}

export default Content;
