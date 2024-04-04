import React from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
const heightScreen = Dimensions.get("screen").height;
const widthScreen = Dimensions.get("screen").width;

function CustomLoader(props) {
    return (
        <View style={styles.mainView}>
            <ActivityIndicator
                animating={true}
                size="large"
                color="#fff"
                style={{ opacity: 1 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        zIndex: 100,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: widthScreen / 1,
        height: heightScreen / 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
});

export default CustomLoader;