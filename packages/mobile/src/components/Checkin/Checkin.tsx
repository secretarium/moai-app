import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Redirect } from '../../ReactRouter';
import { withState } from '../../store';
import { ParsedCode, Sources } from './dataParser';
import Modal from 'react-native-modal';
import { commonStyles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteComponentProps, useHistory } from 'react-router';
import MainLayout from '../common/MainLayout';
import { checkIn, connect } from '../../actions';


const Checkin = withState<RouteComponentProps<{
    venue: string;
    source?: string;
    type?: string
}>>()(
    (s) => ({
        localKey: s.system.localKey,
        checkInError: s.system.checkInError,
        isConnected: s.system.isConnected
    }),
    ({ dispatch, localKey, match, checkInError, isConnected }) => {

        const history = useHistory();
        const [redirect, setRedirect] = useState(false);
        const [venueInfo, setVenueInfo] = useState<ParsedCode>({
            source: Sources.MOAI,
            type: null,
            ...match.params
        });
        const [pageError, setPageError] = useState<string>();
        const [showModal, setShowModal] = useState<boolean>(false);
        const [isConnecting, setIsConnecting] = useState(false);

        // Color theme
        const colorScheme = useColorScheme();
        const themeModalStyle = colorScheme !== 'dark' ? 'black' : 'white';
        const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
        const themeLogoStyle = colorScheme !== 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');

        useEffect(() => {
            async function connectBackend() {
                dispatch(connect(localKey))
                    .then(() => {
                        setIsConnecting(false);
                    });
            }
            if (!isConnected) {
                setIsConnecting(true);
                connectBackend();
            }
        }, [dispatch, localKey, isConnected, isConnecting]);

        useEffect(() => {
            async function checkInLocation() {
                dispatch(checkIn(venueInfo))
                    .then(() => {
                        setRedirect(true);
                    })
                    .catch((error) => {
                        console.error('checkIn', error);
                        setPageError(checkInError);
                        setShowModal(true);
                        setVenueInfo(undefined);
                    });
            }
            if (isConnected && venueInfo && !isConnecting) {
                checkInLocation();
            }
        }, [dispatch, isConnected, venueInfo, checkInError, isConnecting]);

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
