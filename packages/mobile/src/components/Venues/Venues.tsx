import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { withState } from '../../store';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'react-router-native';
import MainLayout from '../common/MainLayout';
import { getVenues } from '../../actions';
import { styles, commonStyles } from './styles';
import { toDateTime } from '../../utils/timeHandler';
import i18n from 'i18n-js';
import { useTheme } from '../../hooks/useTheme';


const Venues = withState()((s) => ({
    venues: s.exposure.venues,
    riskProfile: s.system.riskProfile
}), ({ venues, riskProfile, dispatch }) => {

    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;
    const { colors } = useTheme();

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
        dispatch(getVenues());
    }, [dispatch]);

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                    {i18n.t('APP_CHECK_IN_HISTORY')}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                    {i18n.t('APP_ALL_CHECKED_IN_LOCATIONS')}
                </Text>
            </View>
            <ScrollView>
                {venues.length > 0 ?
                    venues.map((venue, index) =>
                        <TouchableOpacity style={[commonStyles.card, { backgroundColor: colors.button }]} key={index}>
                            <Link to={riskProfile ? `/feedback/form/${venue.type}/${venue.id}` : '/feedback/riskProfile'} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                                <>
                                    <View style={{ maxWidth: '90%' }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{locationTypes[venue.type]}</Text>
                                        <Text style={[styles.cardText, { fontFamily: 'Poppins-Regular', color: colors.text }]}>{i18n.t('APP_CHECKED_IN')} <Bold>{toDateTime(venue.time)}</Bold></Text>
                                    </View>
                                    <Entypo
                                        name="chevron-right"
                                        style={{ alignSelf: 'center' }}
                                        color={colors.text}
                                        size={24} />
                                </>
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
