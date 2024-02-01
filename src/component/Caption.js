import React from 'react';
import { Text, StyleSheet  } from 'react-native';


export default Caption = ({ text, style, numberOfLines, onPress }) => {
    return (
        <Text numberOfLines={numberOfLines} onPress={onPress} style={style}>{text}</Text>
    );
}

