import React from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { AnimatePresence } from 'framer-motion';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/index.css';

config.autoAddCss = false;
library.add(faFacebook);

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
    </AnimatePresence>;
};

export default App;