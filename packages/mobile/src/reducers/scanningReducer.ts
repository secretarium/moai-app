import { SAVE_QR_CODE } from '../actions/types';
import { ScanningActions } from '../actions/scanningActions';

type ScannedCodeState = {
    scannedCode: string;
};

const initialState: ScannedCodeState = {
    scannedCode: null
};

export const scanningReducer = (state: ScannedCodeState = initialState, action: ScanningActions) => {
    switch (action.type) {
        case SAVE_QR_CODE:
            return {
                ...state,
                scannedCode: action.payload
            };
        default:
            return state;
    }
};