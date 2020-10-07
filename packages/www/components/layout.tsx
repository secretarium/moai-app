import React from 'react';
import { motion } from 'framer-motion';
import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
import Sticky from 'react-sticky-el';
import NavBar from './nav-bar';
import layoutStyles from './layout-styles.module.css';
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga';

type Props = {
    preview?: boolean
    children: React.ReactNode
};

const cyrb53 = function (str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

const Layout = ({ preview, children }: Props) => {

    const [fixedToggle, setFixedToggle] = useState(false);
    const [hasInitAnalytics, setHasInitAnalytics] = useState(false);

    useEffect(() => {
        if (!hasInitAnalytics) {

            const validityInterval = Math.round(new Date().getTime() / 1000 / 3600 / 24 / 4);
            const clientIdSource = 'com.secretarium.marker;' + window.location.host + ';' + navigator.userAgent + ';' + navigator.language + ';' + validityInterval;
            let clientId;
            try {
                clientId = cyrb53(clientIdSource).toString(16);
            } catch (e) {
                clientId = clientIdSource;
            }

            ReactGA.initialize('UA-174844899-1', {
                gaOptions: {
                    clientId,
                    storage: 'none'
                }
            });
            setHasInitAnalytics(true);
        }
        ReactGA.pageview(window.location.pathname + window.location.search);
    });

    return (
        <>
            <Meta />
            <Sticky
                className={layoutStyles.stickyPanel}
                stickyClassName={layoutStyles.stuck}
                onFixedToggle={(fixed) => setFixedToggle(fixed)}
            >
                <NavBar fixedToggle={fixedToggle} />
            </Sticky>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen">
                <Alert preview={preview} />
                <main>{children}</main>
            </motion.div>
            <Footer />
        </>
    );
};

export default Layout;
