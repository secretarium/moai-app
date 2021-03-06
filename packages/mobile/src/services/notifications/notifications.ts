import Constants from 'expo-constants';
import Base64 from 'Base64';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Utils } from '@secretarium/connector';
import crypto from '../../utils/vendor/msrCrypto';


const toBase64 = (src: Uint8Array, urlSafeMode = false): string => {
    const x = Base64.btoa(String.fromCharCode.apply(null, Array.from(src)));
    return urlSafeMode ? x.replace(/\+/g, '-').replace(/\//g, '_') : x;
};

export const decryptPushNotification = async (pushNotifEncryptionKey: string, body: string): Promise<string> => {
    const key = Utils.fromBase64(pushNotifEncryptionKey, true);
    const encryptedBytes = Utils.fromBase64(body, true);
    const iv = encryptedBytes.subarray(0, 12);
    const cryptoKey = await crypto.subtle?.importKey('raw', key, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
    const msgBytes = new Uint8Array(await crypto.subtle?.decrypt({ name: 'AES-GCM', iv: iv, tagLength: 128 }, cryptoKey, encryptedBytes.subarray(12)));
    return Utils.decode(msgBytes);
};

export const createPushNotifEncryptionKey = (): string => {
    return toBase64(Utils.getRandomBytes(16), true);
};

export const sendPushNotification = async (msg: string, expoPushToken: string, goToPath: string): Promise<void> => {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'New message! ✉️',
        body: msg,
        data: { url: goToPath }
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
};

export const registerForPushNotificationsAsync = async (): Promise<string> => {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        });
    }

    return token;
};