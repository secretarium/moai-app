import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import { withState } from './store';
import { styles } from './styles';
import { generateLocalKey } from './actions';


const Connector = withState()(
    (s) => ({
        localKey: s.system.localKey
    }),
    ({ dispatch, localKey, children }) => {

        const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);
        const [hasObtainedLocalKey, setHasObtainedLocalKey] = useState(false);

        useEffect(() => {
            if (!localKey && !hasRequestedLocalKey) {
                setHasRequestedLocalKey(true);
                dispatch(generateLocalKey()).then(() => {
                    setHasObtainedLocalKey(true);
                });
            } else if (localKey && !hasRequestedLocalKey && !hasObtainedLocalKey) {
                setHasRequestedLocalKey(true);
                setHasObtainedLocalKey(true);
            }
        }, [dispatch, hasRequestedLocalKey, hasObtainedLocalKey, localKey]);

        if (!hasObtainedLocalKey && !localKey)
            return <View style={styles.container}>
                <Image source={require('../assets/splash.png')} style={styles.backgroundImage} />
                <ActivityIndicator size="large" color="#fff" />
                <Text>Generating local key...</Text>
            </View>;
        else
            return <>{children}</>;
    });

export default Connector;
