/* eslint-disable react/display-name */
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderLeftWidth: 4,
    },
    body: {marginLeft: 15, marginRight: 5},
    successContainer: {
        borderColor: '#00BC83',
    },
    errorContainer: {
        borderColor: 'pink',
    },
    successText: {color: '#00BC83', fontWeight: 'bold'},
    errorText: {color: '#BE233B', fontWeight: 'bold'},
    description: {
        marginTop: 5,
    },
    text: {
        fontSize: 16,
        paddingRight: 5,
    },
});

const toastConfig = {
    success: ({text1, text2, onPress}) => (
        <Pressable
            style={[styles.container, styles.successContainer]}
            onPress={onPress}>
            <Icon name="check" color="#00BC83" size={16} />
            <View style={styles.body}>
                <Text style={[styles.text, styles.successText]}>{text1}</Text>
                {text2 && <Text style={[styles.description]}>{text2}</Text>}
            </View>
        </Pressable>
    ),

    error: ({text1, text2, onPress}) => (
        <Pressable
            style={[styles.container, styles.errorContainer]}
            onPress={onPress}>
            <Icon name="close-a" color="#BE233B" size={16} />
            <View style={styles.body}>
                <Text style={[styles.text, styles.errorText]}>{text1}</Text>
                {text2 && <Text style={[styles.description]}>{text2}</Text>}
            </View>
        </Pressable>
    ),
};

export default toastConfig;
