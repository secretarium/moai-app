import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useQuery, gql } from '@apollo/client';
import { Route, Link } from './react-router';

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

const GET_TWEET = gql`
    query {
        twitter {
            tweet(id: "1261034643710775299") {
            text
            user {
                name
                screen_name
                profile_image_url
            }
            }
        }
    }
`;

const Home = () => <Text>
    <FontAwesome name="windows" size={25} />
</Text>;

const About = () => {
    const { data, loading, error } = useQuery(GET_TWEET);
    if (error) { console.error('error', error); }
    if (loading) {
        return (
            <Text>
                <ActivityIndicator />
            </Text>
        );
    }
    const { tweet } = data.twitter;
    const { user } = tweet;
    return (
        <View >
            <Text>About</Text>
            <Text>{user.name}</Text>
            <Image
                source={{ uri: user.profile_image_url }}
            />
        </View>
    );
};

const Navigation: React.FC = () => (
    <View style={styles.container}>
        <View style={styles.nav}>
            <Link to="/">
                <Text>Home</Text>
            </Link>
            <Link to="/about">
                <Text>About</Text>
            </Link>
        </View>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
    </View>
);

export default Navigation;