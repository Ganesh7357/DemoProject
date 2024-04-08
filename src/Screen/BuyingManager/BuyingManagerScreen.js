//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppHeader from '../../component/AppHeader';
import ImagePath from '../../lip/ImagePath';
import Colors from '../../lip/Colors';
// create a component
const BuyingManagerScreen = ({ navigation }) => {
    const contacts = [
        {
            id: 1,
            name: 'Mark Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
        },
        {
            id: 2,
            name: 'Clark Man',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
        },
        {
            id: 3,
            name: 'Jaden Boor',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
        },
        {
            id: 4,
            name: 'Srick Tree',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
        },
        {
            id: 5,
            name: 'Erick Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
        },
        {
            id: 6,
            name: 'Francis Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
        },
        {
            id: 8,
            name: 'Matilde Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
            id: 9,
            name: 'John Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
        },
        {
            id: 10,
            name: 'Fermod Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
        },
        {
            id: 11,
            name: 'Danny Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
            id: 11,
            name: 'Danny Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
            id: 11,
            name: 'Danny Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
            id: 11,
            name: 'Danny Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
            id: 11,
            name: 'Danny Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
            id: 11,
            name: 'Danny Doe',
            status: 'active',
            image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        },

    ];
    return (
        <View style={styles.container}>
            <AppHeader
                leftIcon={ImagePath.Ic_back}
                onClickleftIcon={() => {
                    navigation.goBack();
                }}
                title={'Buying Manager'}
                rightIcon={ImagePath.Ic_notification}
                onClickrightIcon={() => {
                    // navigation.navigate('NotificationScreen');
                }}
            />
            <ScrollView>
                {contacts?.map((item, index) => {
                    return (
                        <TouchableOpacity key={index}
                            onPress={() => {
                                navigation.navigate('InfoPropertyScreen');
                            }}
                        >
                            <View
                                style={{
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#333',
                                    margin: 10,
                                    // backgroundColor: Colors.ThemeColor,
                                    flex: 1,
                                    flexDirection: 'row',
                                    padding:5
                                }}>
                                <Image source={{ uri: item?.image }} style={styles.pic} />
                                <View>
                                    <Text style={{ margin: 10, fontSize: 15, color: '#333' }}>Name : {item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    )
                })}
            </ScrollView>

            <View style={styles.btnFab}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddPropertyScreen');
                    }}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        marginVertical: 5,

                    }}>
                    <Image source={ImagePath.Ic_addlead} style={styles.imgStyle}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    btnFab: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        flex: 1,
        borderRadius: 5,
    },
    imgStyle: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
    pic: {
        borderRadius: 20,
        width: 40,
        height: 40,
    },
});

//make this component available to the app
export default BuyingManagerScreen;
