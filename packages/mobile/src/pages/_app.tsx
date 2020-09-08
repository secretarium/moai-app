import React from 'react';
import 'setimmediate';
import 'resize-observer-polyfill';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
