import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Redirect } from '../../ReactRouter';
import { actionTypes } from '../../actions/constants';
import { withState } from '../../store';
import { SCP, Key, Constants } from '@secretarium/connector';
import { ParsedCode, Sources } from './dataParser';
import Modal from 'react-native-modal';
import { commonStyles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteComponentProps, useHistory } from 'react-router';
import MainLayout from '../common/MainLayout';
import { checkIn } from '../../actions/system';


const scp = new SCP();
const isDev = process.env.NODE_ENV === 'development';

const Checkin = withState<RouteComponentProps<{
    venue: string;
    source?: string;
    type?: string
}>>()(
    (s) => ({
        localKey: s.system.localKey,
        checkInError: s.system.checkInError
        //isConnected: s.system.isConnected
    }),
    ({ dispatch, localKey, match, checkInError }) => {

        const history = useHistory();
        const [isConnecting, setIsConnecting] = useState(false);
        const [isConnected, setIsConnected] = useState(false);
        const [redirect, setRedirect] = useState(false);
        const [venueInfo, setVenueInfo] = useState<ParsedCode>({
            source: Sources.MOAI,
            type: null,
            ...match.params
        });
        const [pageError, setPageError] = useState<string>();
        const [showModal, setShowModal] = useState<boolean>(false);

        // Color theme
        const colorScheme = useColorScheme();
        const themeModalStyle = colorScheme !== 'dark' ? 'black' : 'white';
        const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
        const themeLogoStyle = colorScheme !== 'dark' ? require('../../assets/logo.png') : require('../../assets/logo-white.png');

        useEffect(() => {
            async function connectBackend() {
                if (localKey && scp.state === Constants.ConnectionState.closed) {
                    Key.importKey(localKey)
                        .then((key) => {
                            scp.connect('wss://ovh-uk-eri-2288-2.node.secretarium.org:443', key, 'rliD_CISqPEeYKbWYdwa-L-8oytAPvdGmbLC0KdvsH-OVMraarm1eo-q4fte0cWJ7-kmsq8wekFIJK0a83_yCg==').then(() => {
                                setIsConnected(true);
                                setIsConnecting(false);
                            }).catch((error) => {
                                setPageError(isDev ? `Connection error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                                setIsConnected(false);
                                setIsConnecting(false);
                                console.error('Connection error:', error);
                            });
                        })
                        .catch((error) => console.error(error));
                }
                else if (scp.state === Constants.ConnectionState.secure) {
                    setIsConnected(true);
                    setIsConnecting(false);
                }
            }
            if (!isConnected && !isConnecting) {
                setIsConnecting(true);
                connectBackend();
            }
        }, [localKey, isConnected, pageError, isConnecting]);

        // useEffect(() => {
        //     if (localKey && isConnected && venueInfo) {
        //         dispatch(checkIn(venueInfo))
        //             .then(() => {
        //                 setRedirect(true);
        //             })
        //             .catch((error) => {
        //                 console.error('checkIn', error);
        //                 setPageError(checkInError);
        //                 setShowModal(true);
        //                 setVenueInfo(undefined);
        //             });
        //     }
        // }, [dispatch, localKey, isConnected, venueInfo, checkInError]);

        useEffect(() => {
            if (isConnected && venueInfo) {
                console.log(venueInfo);
                const query = scp.newTx('moai', 'check-in', `moai-qr-${Date.now()}`, venueInfo);
                query.onExecuted?.(() => {
                    dispatch({ type: actionTypes.MOAI_SAVE_QR_CODE, payload: venueInfo });
                    dispatch({ type: actionTypes.MOAI_INCREMENT_SCAN_COUNTER });
                    setRedirect(true);
                });
                query.onError?.((error: any) => {
                    console.error('Error', error);
                    setPageError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                    setVenueInfo(undefined);
                    setIsConnected(false);
                    setShowModal(true);
                });
                query.send?.()
                    .catch((error) => {
                        console.error('Error', error);
                        setPageError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                        setVenueInfo(undefined);
                        setIsConnected(false);
                        setShowModal(true);
                    });
            }
        }, [dispatch, isConnected, venueInfo]);

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
