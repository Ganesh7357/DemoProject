import React, {PureComponent} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyboardScroll = (props) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      bounces={false}
      {...props}>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardScroll;