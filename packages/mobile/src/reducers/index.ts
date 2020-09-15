import { combineReducers } from "redux";
import { onboardingReducer } from "./onboardingReducer";

export const rootReducer = combineReducers({
    onboarding: onboardingReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
