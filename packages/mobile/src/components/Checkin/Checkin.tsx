import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Redirect } from '../../ReactRouter';
import { actionTypes } from '../../actions/constants';
import { withState } from '../../store';
import { SCP, Constants } from '../../../../connect/src';
import { ParsedCode, Sources } from './dataParser';
import Modal from 'react-native-modal';
import { commonStyles } from '../commonStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteComponentProps } from 'react-router';

const scp = new SCP();
const isDev = process.env.NODE_ENV === 'development';

const Checkin = withState<RouteComponentProps<{
    venue: string;
    source?: string;
    type?: string
}>>()(
    (s) => ({
        localKey: s.system.localKey
    }),
    ({ dispatch, localKey, match }) => {

        const [isConnected, setIsConnected] = useState(false);
        const [redirect, setRedirect] = useState(false);
        const [venuInfo, setVenuInfo] = useState<ParsedCode>({
            source: Sources.MOAI,
            ...match.params
        });
        const [error, setError] = useState<string>();
        const [showModal, setShowModal] = useState<boolean>(false);

        // Color theme
        const colorScheme = useColorScheme();
        const themeModalStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';
        const themeColorStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? '#D3D3D3' : '#404040';
        const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'white' : 'black';

        useEffect(() => {
            async function connectBackend() {
                if (localKey && scp.state === Constants.ConnectionState.closed) {
                    scp.connect('wss://ovh-uk-eri-2288-2.node.secretarium.org:443', localKey, 'rliD_CISqPEeYKbWYdwa-L-8oytAPvdGmbLC0KdvsH-OVMraarm1eo-q4fte0cWJ7-kmsq8wekFIJK0a83_yCg==').then(() => {
                        setIsConnected(true);
                    }).catch((error) => {
                        setError(isDev ? `Connection error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                        setIsConnected(false);
                        console.error(error);
                    });
                }
                else if (scp.state === Constants.ConnectionState.secure)
                    setIsConnected(false);
            }
            connectBackend();
        }, [localKey, error]);

        useEffect(() => {
            if (isConnected && venuInfo) {

                const query = scp.newTx('moai', 'check-in', `moai-qr-${Date.now()}`, venuInfo);
                query.onExecuted?.(() => {
                    dispatch({ type: actionTypes.MOAI_SAVE_QR_CODE, payload: venuInfo });
                    dispatch({ type: actionTypes.MOAI_INCREMENT_SCAN_COUNTER });
                    setRedirect(true);
                });
                query.onError?.((error: any) => {
                    console.error('Error', error);
                    setError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                    setVenuInfo(undefined);
                    setIsConnected(false);
                    setShowModal(true);
                });
                query.send?.()
                    .catch((error) => {
                        console.error('Error', error);
                        setError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                        setVenuInfo(undefined);
                        setIsConnected(false);
                        setShowModal(true);
                    });
            }
        }, [dispatch, isConnected, venuInfo]);

        let composition;

        if (redirect === true)
            composition = <Redirect to={'/scanned'} />;
        else
            composition =
                <>
                    <View>
                        <Text style={{ fontSize: 24, color: themeTextStyle, paddingTop: 30 }}>Checking in...</Text>
                    </View>
                </>;

        return (
            <>
                <Modal isVisible={showModal}>
                    <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                        <MaterialIcons name='error' size={84} color={themeModalStyle} />
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeModalStyle }}>
                            {error}
                        </Text>
                        <Button title='Close' onPress={() => setShowModal(false)} />
                    </View>
                </Modal>
                {composition}
            </>
        );
    }
);

export default Checkin;
