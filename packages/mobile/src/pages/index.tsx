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

const IndexPage: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Expo + Next.js <span aria-label="Waving hand" role="img">👋</span></Text>
        </View>
    );
};

export default IndexPage;

