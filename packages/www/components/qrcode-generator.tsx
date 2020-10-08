import React, { useEffect, useState } from 'react';
import { Key, SCP, Constants } from '../connect/src';
import QRCode from 'qrcode-svg';
import Link from 'next/link';

const scp = new SCP();
const isDev = process.env.NODE_ENV === 'development';
const locationTypes = [
    'Restaurant',
    'Taxi',
    'Museum',
    'Gallerie'
];

const QRCodeGenerator: React.FC = () => {

    const [hasInitialisedKey, setHasInitialisedKey] = useState(false);
    const [hasShownNotice, setHasShownNotice] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string>();
    const [key, setKey] = useState<any>();
    const [locationType, setLocationType] = useState<number>(-1);
    // const [locationNumber, setLocationNumber] = useState<number>(-1);
    const [qrCode, setQrCode] = useState<string>();

    useEffect(() => {
        if (hasShownNotice && !hasInitialisedKey && !key) {
            Key.createKey()
                .then((keyPair: any) => {
                    setKey(keyPair);
                })
                .catch((error: any) => {
                    setError(isDev ? `Key generation error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                    console.error(error);
                });
            setHasInitialisedKey(true);
        }
        //  else {
        //     setKey(undefined);
        //     setHasInitialisedKey(false);
        // }
    }, [hasInitialisedKey, hasShownNotice, key]);

    useEffect(() => {
        async function connectBackend() {
            if (key && scp.state === Constants.ConnectionState.closed && locationType !== -1) {
                scp.connect('wss://ovh-uk-eri-2288-2.node.secretarium.org:443', key, 'rliD_CISqPEeYKbWYdwa-L-8oytAPvdGmbLC0KdvsH-OVMraarm1eo-q4fte0cWJ7-kmsq8wekFIJK0a83_yCg==').then(() => {
                    setIsConnected(true);
                }).catch((error) => {
                    setError(isDev ? `Connection error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                    setIsConnected(false);
                    console.error(error);
                });
            }
            //  else
            //     setIsConnected(false);
        }
        connectBackend();
    }, [key, locationType]);

    useEffect(() => {
        if (isConnected && locationType !== -1) {

            const query = scp.newTx('moai', 'generate-venue-id', `moai-qr-${Date.now()}`, {
                type: locationType
            });
            query.onExecuted?.(() => {
                console.log('Executed');
            });
            query.onResult?.((result: any) => {
                setError(undefined);
                setQrCode(encodeURI(result.id));
                console.log('Result', result);
            });
            query.onError?.((error: any) => {
                setError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                setQrCode(undefined);
                console.error('Error', error);
                setIsConnected(false);
            });
            query.send?.()
                .catch((error) => {
                    setError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                    setQrCode(undefined);
                    console.error('Error', error);
                    setIsConnected(false);
                });
        }
    }, [isConnected, locationType]);

    let composition;

    if (error)
        composition = <span>{error}</span>;
    else if (!hasShownNotice)
        composition = <>
            <p>Before we start here are some things you must know:</p>
            <h4>Each QR code should only be displayed at one location</h4>
            <p>For contact tracing to be effective, it is important that each QR code you generate is only used in one place. You can print a single QR code more than once if you want to display it in more than one place at your location (for example at different entrances).</p>
            <h4>If you have more than one location, you’ll get separate QR codes</h4>
            <p>You will get a separate PDF file for every location; each will contain a unique QR code. Please name your PDF files as soon as you download them so you can keep track of which QR code is displayed at which location.</p>
            <h4>In case of damage, reprint or generate a new code</h4>
            <p>If your QR code gets damaged, you can reprint the original PDF. Don’t worry if you forget to save it, you can always generate a new QR code instead. Just remember, if you are using the same code in multiple places at one location, make sure to replace all of them.</p>
            <button className="btn" onClick={() => setHasShownNotice(true)}>I understand</button>
        </>;
    else if (locationType === -1)
        composition = <>
            <h4>What kind of location do you need a QRcode for ?</h4>
            <select value={locationType} onChange={(event) => setLocationType(parseInt(event.currentTarget.value))}>
                <option key={'none'} value={-1}>-</option>
                {locationTypes.map((name, index) => <option key={index} value={index}>{name}</option>)}
            </select>
        </>;
    // else if (locationNumber === -1)
    //     composition = <>
    //             <h4>How many QRcode would you need ?</h4>
    //             <select value={locationNumber} onChange={(event) => setLocationNumber(parseInt(event.currentTarget.value))}>
    //                 <option key={'none'} value={-1}>-</option>
    //                 {Array(5).map((name, index) => <option key={index} value={index}>{index}</option>)}
    //             </select>
    //             <button className="bnt"></button>
    //         </>;
    else if (!isConnected)
        composition = <div>Connecting to Moai...</div>;
    else if (qrCode)
        composition = <>
            <h4>Here is a QRCode for your {locationTypes[locationType].toLocaleLowerCase()}!</h4>
            <br />
            <br />
            <div dangerouslySetInnerHTML={{
                __html: new QRCode({
                    content: `https://moai-app.com/check/${qrCode}`,
                    padding: 0,
                    ecl: 'H'
                }).svg()
            }}></div>
            <br />
            <br />
            <Link href={`/pdf/${qrCode}`}>
                <a target="_blank" className="btn dl-pdf">Download a PDF version</a>
            </Link>
        </>;
    else
        composition = <pre>
            {JSON.stringify(key)}
        </pre>;

    return (
        <div className="text-center">
            {composition}
        </div>
    );
};

export default QRCodeGenerator;
