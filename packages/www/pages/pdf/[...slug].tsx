import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import pdf, { CreateOptions } from 'html-pdf';
import QRCode from 'qrcode-svg';
import headerLogo from '../../public/assets/images/logo.svg';
import { NextPageContext } from 'next';

const componentToPDFBuffer = (component: React.ReactElement) => {
    return new Promise((resolve, reject) => {
        const html = renderToStaticMarkup(component);

        const options: CreateOptions = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
            footer: {
                height: '10mm'
            },
            type: 'pdf',
            timeout: 30000
        };

        pdf.create(html, options).toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            return resolve(buffer);
        });
    });
};

class PDFRenderer extends React.Component {

    static async getInitialProps({ req, res, query }: NextPageContext) {
        const isServer = !!req;

        if (isServer) {
            const buffer = await componentToPDFBuffer(
                <div>
                    <div style={{
                        height: '100%'
                    }}>
                        <img src={headerLogo} alt="moai" />
                        <h1>Set up Moai at your location</h1>
                        <h2>Each QR code should only be displayed at one location</h2>
                        <p>For contact tracing to be effective, it is important that each QR code you generate is only used in one place. You can print a single QR code more than once if you want to display it in more than one place at your location (for example at different entrances).</p>

                        <h2>If it’s damaged, reprint or generate a new code</h2>
                        <p>If your QR code gets damaged, you can reprint the original PDF. Don’t worry if you forget to save it, you can always generate a new QR code instead. Just make sure to replace all of them if you are using the same code in multiple places at one location.</p>

                        <h2>If you have more than one location</h2>
                        <p>You will get a separate PDF file for every location; each will contain a unique QR code. Please name your PDF files as soon as you download them so you can keep track of which QR code is displayed at which location</p>
                    </div>

                    <div style={{
                        height: '100%'
                    }}>
                        <h1>Check in with Moai</h1>
                        <p>The private track and trace app</p>
                        <div dangerouslySetInnerHTML={{
                            __html: new QRCode({
                                content: `https://moai-app.com/check/${query.slug}`,
                                padding: 0,
                                ecl: 'H'
                            }).svg()
                        }} style={{
                            textAlign: 'center'
                        }}></div>
                        <div>
                            <ol>
                                <li>Scan and go</li>
                                <li>No personal data needed</li>
                                <li>You’ll be notified if you’re at risk</li>
                            </ol>

                            <br />
                            Download the Moai app to check in anonymously

                            <br />
                            <br />
                            A non-profit initiative funded by UKRI. Built with love in London by Secretarium, a deep-tech startup with a passion for data security.
                        </div>
                    </div>
                </div>
            );
            res?.setHeader('Content-disposition', `attachment; filename="moai_qrcode_${Date.now()}.pdf`);
            res?.setHeader('Content-Type', 'application/pdf');
            res?.end(buffer);
        }

        return {};
    }

    render() {
        return (<div>Hello !</div>);
    }
}

export default PDFRenderer;