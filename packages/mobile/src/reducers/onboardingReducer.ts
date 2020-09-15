import { SHOW_ONBOARDING } from '../actions/types';
import { OnboardingActions } from '../actions/onboardingActions';

type OnboardingState = {
    onboardUser: boolean;
};

const initialState: OnboardingState = {
    onboardUser: true,
};

export const onboardingReducer = (
    state: OnboardingState = initialState,
    action: OnboardingActions
) => {
    switch (action.type) {
        case SHOW_ONBOARDING:
            return {
                ...state,
                onboardUser: action.payload,
            };
        default:
            return state;
    }
};
