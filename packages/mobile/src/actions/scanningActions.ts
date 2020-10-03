import { SAVE_QR_CODE } from './types';

export interface SaveQR {
    type: typeof SAVE_QR_CODE;
    payload: string;
}

export type ScanningActions = SaveQR;