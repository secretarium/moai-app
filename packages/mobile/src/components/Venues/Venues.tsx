import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { withState } from '../../store';
import { Entypo } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../ReactRouter';
import { useHistory } from 'react-router';
import MainLayout from '../common/MainLayout';
import { getVenues } from '../../actions';
import styles from './styles';
import { toDateTime } from '../../utils/timeHandler';
import i18n from 'i18n-js';


const Venues = withState()((s) => ({
    venues: s.exposure.venues,
    riskProfile: s.exposure.riskProfile
}), ({ venues, riskProfile, dispatch }) => {

    const history = useHistory();
    const [hasFetchedVenues, setHasFetchedVenues] = useState(false);
    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    const locationTypes = {
        0: 'Accommodation. For example, bed and breakfasts and campsites',
        1: 'Childcare in public and private settings',
        2: 'Education including universities',
        3: 'Events and conference space',
        4: 'Finance and professional service. For example, high street banks and real estate agencies',
        5: 'Medical facility. For example, hospitals, GP practices and veterinary clinics',
        6: 'Non-residential institution. For example, community centres, libraries, crematoria and funeral homes',
        7: 'Office location and workspace',
        8: 'Personal care. For example, hair salons and barbers, spas and beauty salons',
        9: 'Place of worship. For example, churches, synagogues, mosques, temples and meeting rooms',
        10: 'Private event',
        11: 'Recreation and leisure. For example, cinemas, theatres, museums and galleries',
        12: 'Rental / hire locations',
        13: 'Residential care. For example, care and nursing homes',
        14: 'Restaurant, cafe, pub or bar',
        15: 'Retail shops',
        16: 'Sports and fitness facilities. For example, gyms, indoor sports facilities, swimming pools',
        17: 'Transport for example, taxis and waiting rooms',
        18: 'Other'
    };

    useEffect(() => {
        if (!riskProfile) {
            history.push('/feedback/riskProfile');
        }
    }, []);

    useEffect(() => {
        if (hasFetchedVenues === false) {
            dispatch(getVenues());
            setHasFetchedVenues(true);
        }
    }, [hasFetchedVenues, dispatch]);

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                    {i18n.t('APP_CHECK_IN_HISTORY')}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                    {i18n.t('APP_ALL_CHECKED_IN_LOCATIONS')}
                </Text>
            </View>
            <ScrollView>
                {venues.length > 0 ?
                    venues.map((venue, index) =>
                        <TouchableOpacity style={[styles.card, { backgroundColor: themeColorStyle }]} key={index}>
                            <Link to={`/feedback/form/${venue.type}`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                                <View style={{ maxWidth: '90%' }}>
                                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{locationTypes[venue.type]}</Text>
                                    <Text style={[styles.cardText, { fontFamily: 'Poppins-Regular', color: themeTextStyle }]}>{i18n.t('APP_CHECKED_IN')} <Bold>{toDateTime(venue.time)}</Bold></Text>
                                </View>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={themeTextStyle}
                                    size={24} />
                            </Link>
                        </TouchableOpacity>
                    )
                    :
                    <Text style={{ fontFamily: 'Poppins-Bold', color: '#E95C59', paddingLeft: 15 }}>{i18n.t('APP_NOT_CHECKED_IN')}!</Text>
                }
            </ScrollView>
        </MainLayout>
    );
});

export default Venues;
