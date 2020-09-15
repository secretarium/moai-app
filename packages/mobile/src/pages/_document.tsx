import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Document from '@expo/next-adapter/document';

class MoaiDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            namespacesRequired: ['common']
        };
    }

    render() {

        return (
            <Html>
                <Head title="Moai" />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MoaiDocument;