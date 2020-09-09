import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { DesktopOrTablet, Mobile } from "../../Breakpoints";

interface Props {
    guestName: string;
}

const MessageItem: React.FC<Props> = ({ guestName }) => {
    return (
        <>
            <DesktopOrTablet>
                <TouchableOpacity style={styles.container}>
                    <View style={styles.guestProfile}>
                        <FontAwesome
                            name="user-circle"
                            size={50}
                            color="black"
                        />
                    </View>
                    <View style={styles.guestName}>
                        <Text>{guestName}</Text>
                    </View>
                </TouchableOpacity>
            </DesktopOrTablet>
            <Mobile>
                <TouchableOpacity style={styles.containerMobile}>
                    <View style={styles.guestProfile}>
                        <FontAwesome
                            name="user-circle"
                            size={50}
                            color="black"
                        />
                    </View>
                    <View style={styles.guestName}>
                        <Text>{guestName}</Text>
                    </View>
                </TouchableOpacity>
            </Mobile>
        </>
    );
};

export default MessageItem;
