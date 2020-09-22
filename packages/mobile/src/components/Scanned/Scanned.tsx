import React from 'react';
import { Text, Image, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { styles, commonStyles } from './styles';

const Scanned: React.FC = () => {


    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#404040';
    const themeTextStyle = colorScheme === 'light' ? 'black' : 'white';
    const themeLogoStyle = colorScheme === 'light' ? require('../../assets/logo.png') : require('../../assets/logo-white.png');
    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;

    return <MainLayout>
        <View style={commonStyles.main}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>Success !</Text>
            <Image
                source={themeLogoStyle}
                resizeMode={'contain'}
                style={commonStyles.logo}
            />
            <Link to={'/scanner'} style={commonStyles.pinButton} underlayColor='transparent'>
                <Image
                    source={require('../../assets/pin-success.png')}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />
            </Link>
        </View>
        <View style={styles.messageContainer} >
            <Text style={[styles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: themeTextStyle, backgroundColor: themeColorStyle }]}>
                <Bold>How NHS Test and Trace will contact you?</Bold>{'\n'}{'\n'}
                        You will be contacted via messaging, directly inside of Moai!{'\n'}{'\n'}
                        You'll be asked to sign in to the NHS Test and Trace contact tracing website at https://contact-tracingphe.gov.uk
            </Text>
        </View>
    </MainLayout>;
};

export default Scanned;