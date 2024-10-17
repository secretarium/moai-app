import { BarcodeScanningResult, BarcodeType } from 'expo-camera';
import { Utils } from '@secretarium/connector';

export type ParsedCode = {
    source?: string;
    venue?: string;
    type?: string;
};

export enum Sources {
    INVALID = 'INVALID',
    MOAI = 'https://moaiapp.com',
    MOAIH = 'https://moai-app.com',
    NHS = 'UKC19TRACING'
}

const isPrefixed = (text: string, prefix: Sources) => {
    return text.substr(0, prefix.length) === prefix;
};

export const parseCode = ({ type, data }: BarcodeScanningResult): ParsedCode => {
    switch (type as BarcodeType) {
        case 'qr':
            if (isPrefixed(data, Sources.MOAI) || isPrefixed(data, Sources.MOAIH)) {
                const comps = data.split('/').slice(-2);
                if (comps?.length === 2 && comps[0] === 'check')
                    return {
                        venue: comps[1]
                    };
            }
            else if (isPrefixed(data, Sources.NHS)) {
                try {
                    const comps = data.split(':');
                    const jwtcp = comps[2]?.split('.');
                    const venue = JSON.parse(String(Utils.fromBase64(jwtcp[1])));
                    return {
                        source: Sources.NHS,
                        venue: venue.id,
                        type: venue.type
                    };
                } catch (e) {
                    // To nothing and let fallback
                }
            }
            break;
        case 'code128':
            break;
    }

    return {
        source: Sources.INVALID
    };
};

export default parseCode;