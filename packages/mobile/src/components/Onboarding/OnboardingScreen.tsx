import React, { Dispatch } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Onboarding from 'react-native-onboarding-swiper'
import { useDispatch } from 'react-redux';
import { OnboardingActions } from 'actions/onboardingActions';
//import { SHOW_ONBOARDING } from 'actions/types';

const OnboardingScreen: React.FC = () => {
    const onboardingDispatch = useDispatch<Dispatch<OnboardingActions>>();

    const onDone = () => {
        onboardingDispatch({ type: "SHOW_ONBOARDING", payload: false });
    }

    return (
        <Onboarding
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
};

export default OnboardingScreen;
