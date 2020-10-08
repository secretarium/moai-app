import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body className="overflow-x-hidden" style={{
                    color: '#213963'
                }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
