import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

interface Props {
    guestName: string;
}

const MessageItem: React.FC<Props> = ({ guestName }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.guestProfile}>
                <FontAwesome name="user-circle" size={50} color="black" />
            </View>
            <View style={styles.guestName}>
                <Text>{guestName}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MessageItem;
