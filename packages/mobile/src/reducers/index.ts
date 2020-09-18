import { combineReducers } from 'redux';
import { onboardingReducer } from './onboardingReducer';
import { scanningReducer } from './scanningReducer';

export const rootReducer = combineReducers({
    onboarding: onboardingReducer,
    scannedCode: scanningReducer
});

export type AppState = ReturnType<typeof rootReducer>;
