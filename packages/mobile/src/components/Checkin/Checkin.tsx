import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { useLocation } from 'react-router-native';
import { withState } from '../../store';
import { ParsedCode } from '../../services/scanner/dataParser';
import Modal from 'react-native-modal';
import { commonStyles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Location, Navigate, useNavigate, useParams } from '../../react-router';
import MainLayout from '../common/MainLayout';
import { checkIn, connect, registerTest } from '../../actions';
import i18n from '../../services/i18n';
import { useTheme } from '../../hooks/useTheme';
import LogoBlack from '../../assets/logo-black.png';
import LogoWhite from '../../assets/logo-white.png';
import PinCheckin from '../../assets/pin-checkin.png';

type LocationTypes = {
    /**
     * ID of the test or AB test scanned by the user
     */
    testId: string;
    /**
     * Type of the test scanned by the user
     */
    testType: 'affectTest' | 'affectABTest';
};

const Checkin = withState()(
    (s) => ({
        localKey: s.system.localKey,
        checkInError: s.system.checkInError,
        isConnected: s.system.isConnected
    }),
    ({ dispatch, localKey, checkInError, isConnected }) => {

        const params = useParams() as {
            venue: string;
            source?: string;
            type?: string
        };
        const naviguate = useNavigate();
        const location = useLocation() as Location<LocationTypes>;
        const [redirect, setRedirect] = useState(false);
        const [test, setTest] = useState<string>(location.state.testId);
        const [type, setType] = useState<string>(location.state.testType);
        const [venueInfo, setVenueInfo] = useState<ParsedCode>({
            ...params
        });
        const [pageError, setPageError] = useState<string>();
        const [showModal, setShowModal] = useState<boolean>(false);
        const [isConnecting, setIsConnecting] = useState(false);
        const [isScanning, setIsScanning] = useState(false);
        const { colors, theme } = useTheme();
        const themeLogoStyle = theme !== 'dark' ? LogoBlack : LogoWhite;

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
            /**
             * Function to check into a location based on a QR code scan
             */
            async function checkInLocation() {
                setIsScanning(true);
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

            /**
             * Function to register a test or AB test based on a barcode scan
             */
            async function registerUserTest() {
                setIsScanning(true);
                dispatch(registerTest(test, type))
                    .then(() => {
                        setRedirect(true);
                    })
                    .catch((error) => {
                        console.error('registerTest', error);
                        setPageError(checkInError);
                        setShowModal(true);
                        setTest(undefined);
                        setType(undefined);
                    });
            }

            if (isConnected && venueInfo && !isConnecting && !test && !isScanning) {
                checkInLocation();
            } else if (isConnected && test && !isConnecting && !isScanning) {
                registerUserTest();
            }

        }, [dispatch, isConnected, venueInfo, checkInError, isConnecting, test, type, isScanning]);

        let composition;

        if (redirect === true)
            composition = <Navigate to={'/scanned'} />;
        else
            composition =
                <>
                    <View style={commonStyles.main}>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: colors.text, top: 30 }}>{!test ? `${i18n.t('APP_CHECKIN')}...` : `${i18n.t('APP_REGISTERING')}...`}</Text>
                        <Image
                            source={themeLogoStyle}
                            resizeMode={'contain'}
                            style={commonStyles.logo}
                        />
                        <View style={commonStyles.pinButton}>
                            <Image
                                source={PinCheckin}
                                resizeMode={'contain'}
                                style={commonStyles.pin}
                            />
                        </View>
                    </View>
                </>;

        return (
            <MainLayout showGoBack={false}>
                <Modal isVisible={showModal}>
                    <View style={[commonStyles.modalContainer, { backgroundColor: colors.modalBackground }]}>
                        <MaterialIcons name='error' size={84} color={colors.modalText} />
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: colors.modalText }}>
                            {pageError}
                        </Text>
                        <Button title='Close' onPress={() => naviguate('/')} />
                    </View>
                </Modal>
                {composition}
            </MainLayout>
        );
    }
);

export default Checkin;
