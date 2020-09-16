import React from 'react';
import App from 'next/app';
import NextI18N from '../i18n';
import 'setimmediate';
import 'resize-observer-polyfill';

const { appWithTranslation } = NextI18N;

// This default export is required in a new `pages/_app.js` file.
const MoaiWebsite = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

MoaiWebsite.getInitialProps = async (appContext) => ({
    ...await App.getInitialProps(appContext),
    namespacesRequired: ['common']
});

export default appWithTranslation(MoaiWebsite);