import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import { withState } from './store';
import { styles } from './styles';
import { generateLocalKey } from './actions';

/**
 * Wrapper used to generate a local key at application's launch,
 * which is then used to connect to Secretarium's backend
 */

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

        if (!hasObtainedLocalKey)
            return <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Image source={require('./assets/logo-white.png')} resizeMode={'contain'} style={{ width: '40%', bottom: 20 }} />
                <ActivityIndicator size="large" color="#fff" />
                <Text style={[styles.text]}>Generating local key...</Text>
            </View>;
        else
            return <>{children}</>;
    });

export default Connector;
