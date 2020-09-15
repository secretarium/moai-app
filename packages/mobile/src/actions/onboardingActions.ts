import { SHOW_ONBOARDING } from './types';

export interface ShowOnboarding {
    type: typeof SHOW_ONBOARDING;
    payload: boolean;
}

export type OnboardingActions = ShowOnboarding;
