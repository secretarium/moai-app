import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { withState } from '../../store';
import { Entypo } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { getVenues } from '../../actions';
import styles from './styles';
import { toDateTime } from '../../utils/timeHandler';


const Venues = withState()((s) => ({
    venues: s.system.venues
}), ({ venues, dispatch }) => {

    const [hasFetchedVenues, setHasFetchedVenues] = useState(false);

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    const locationTypes = {
        12: 'Accommodation. For example, bed and breakfasts and campsites',
        13: 'Childcare in public and private settings',
        14: 'Education including universities',
        15: 'Events and conference space',
        16: 'Finance and professional service. For example, high street banks and real estate agencies',
        17: 'Medical facility. For example, hospitals, GP practices and veterinary clinics',
        18: 'Non-residential institution. For example, community centres, libraries, crematoria and funeral homes',
        19: 'Office location and workspace',
        20: 'Personal care. For example, hair salons and barbers, spas and beauty salons',
        21: 'Place of worship. For example, churches, synagogues, mosques, temples and meeting rooms',
        22: 'Private event',
        23: 'Recreation and leisure. For example, cinemas, theatres, museums and galleries',
        24: 'Rental / hire locations',
        25: 'Residential care. For example, care and nursing homes',
        26: 'Restaurant, cafe, pub or bar',
        27: 'Retail shops',
        28: 'Sports and fitness facilities. For example, gyms, indoor sports facilities, swimming pools',
        29: 'Transport for example, taxis and waiting rooms',
        30: 'Other'
    };

    useEffect(() => {
        if (!hasFetchedVenues) {
            dispatch(getVenues());
            setHasFetchedVenues(true);
        }
    }, [hasFetchedVenues, dispatch]);

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true} withNavigation={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                    Measure exposure risk
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                    These are all locations you have checked-in to. Tap a location and answer a short survey to measure factors that affect the spread of COVID-19.
                </Text>
            </View>
            <ScrollView>
                {venues.length > 0 ?
                    venues.map((venue, index) =>
                        <TouchableOpacity style={[styles.card, { backgroundColor: themeColorStyle }]} key={index}>
                            <Link to={'/questionnaire'} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                                <>
                                    <View style={{ maxWidth: '90%' }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 16 }}>{locationTypes[venue.type]}</Text>
                                        <Text style={[styles.cardText, { fontFamily: 'Poppins-Regular', color: themeTextStyle }]}>Checked-in on {toDateTime(venue.time)}</Text>
                                    </View>
                                    <Entypo
                                        name="chevron-right"
                                        style={{ alignSelf: 'center' }}
                                        color={themeTextStyle}
                                        size={24} />
                                </>
                            </Link>
                        </TouchableOpacity>
                    )
                    :
                    'You have not checked-in to any location yet.'
                }
            </ScrollView>
        </MainLayout>
    );
});

export default Venues;
