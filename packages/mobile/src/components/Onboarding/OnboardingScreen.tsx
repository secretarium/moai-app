import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Onboarding from 'react-native-onboarding-swiper';
import { actionTypes } from '../../actions/constants';
import { withState } from '../../store';
import { Navigate } from 'react-router-native';

const OnboardingScreen = withState()(
    null,
    ({ dispatch }) => {

        const [showOnboarding, setShowOnboarding] = useState(true);

        const onDone = () => {
            dispatch({ type: actionTypes.MOAI_SHOW_ONBOARDING, payload: false });
            setShowOnboarding(false);
        };

        if (!showOnboarding)
            return <Navigate to="/home" />;

        return (
            <Onboarding
                showSkip={false}
                onDone={onDone}
                pages={[
                    {
                        backgroundColor: '#e95c59',
                        image: <FontAwesome name="rocket" size={300} color="white" />,
                        title: 'Moai',
                        subtitle: 'First onboarding screen'
                    },
                    {
                        backgroundColor: '#00b0ee',
                        image: <FontAwesome name="ambulance" size={250} color="white" />,
                        title: 'Moai',
                        subtitle: 'Second onboarding screen'
                    },
                    {
                        backgroundColor: '#203864',
                        image: <FontAwesome name="sun-o" size={250} color="white" />,
                        title: 'Moai',
                        subtitle: 'Third onboarding screen'
                    }
                ]} />
        );
    }
);

export default OnboardingScreen;
