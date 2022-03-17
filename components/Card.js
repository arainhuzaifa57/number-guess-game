import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        // Shadow Property is only work in iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default Card;
