import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Redirect } from '../../ReactRouter';
import { actionTypes } from '../../actions/constants';
import { withState } from '../../store';
import { SCP, Key, Constants } from '../../../../connect/src';
import { ParsedCode, Sources } from './dataParser';
import Modal from 'react-native-modal';
import { commonStyles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteComponentProps, useHistory } from 'react-router';
import MainLayout from '../common/MainLayout';

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

        const history = useHistory();
        const [isConnected, setIsConnected] = useState(false);
        const [redirect, setRedirect] = useState(false);
        const [venuInfo, setVenuInfo] = useState<ParsedCode>({
            source: Sources.MOAI,
            type: null,
            ...match.params
        });
        const [pageError, setPageError] = useState<string>();
        const [showModal, setShowModal] = useState<boolean>(false);

        // Color theme
        const colorScheme = useColorScheme();
        const themeModalStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';
        const themeColorStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? '#D3D3D3' : '#404040';
        const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';
        const themeLogoStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? require('../../assets/logo.png') : require('../../assets/logo-white.png');

        useEffect(() => {
            async function connectBackend() {
                if (localKey && scp.state === Constants.ConnectionState.closed) {
                    Key.importKey(localKey.exportableKey).then((key) => {
                        scp.connect('wss://ovh-uk-eri-2288-2.node.secretarium.org:443', key, 'rliD_CISqPEeYKbWYdwa-L-8oytAPvdGmbLC0KdvsH-OVMraarm1eo-q4fte0cWJ7-kmsq8wekFIJK0a83_yCg==').then(() => {
                            setIsConnected(true);
                        }).catch((error) => {
                            setPageError(isDev ? `Connection error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                            setIsConnected(false);
                            console.error(error);
                        });
                    });
                }
                else if (scp.state === Constants.ConnectionState.secure)
                    setIsConnected(true);
            }
            if (!isConnected)
                connectBackend();
        }, [localKey, isConnected, pageError]);

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
                    setPageError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                    setVenuInfo(undefined);
                    setIsConnected(false);
                    setShowModal(true);
                });
                query.send?.()
                    .catch((error) => {
                        console.error('Error', error);
                        setPageError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
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
                    <View style={commonStyles.main}>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>Checking in...</Text>
                        <Image
                            source={themeLogoStyle}
                            resizeMode={'contain'}
                            style={commonStyles.logo}
                        />
                        <View style={commonStyles.pinButton}>
                            <Image
                                source={require('../../assets/pin-checkin.png')}
                                resizeMode={'contain'}
                                style={commonStyles.pin}
                            />
                        </View>
                    </View>
                </>;

        return (
            <MainLayout showGoBack={false}>
                <Modal isVisible={showModal}>
                    <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                        <MaterialIcons name='error' size={84} color={themeModalStyle} />
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeModalStyle }}>
                            {pageError}
                        </Text>
                        <Button title='Close' onPress={() => history.push('/')} />
                    </View>
                </Modal>
                {composition}
            </MainLayout>
        );
    }
);

export default Checkin;
