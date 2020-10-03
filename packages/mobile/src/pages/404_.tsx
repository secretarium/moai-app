import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16
    }
});

const E404Page: React.FC = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>404 <span aria-label="Waving hand" role="img">🌋</span></Text>
        </View>
    );
};

export default E404Page;

