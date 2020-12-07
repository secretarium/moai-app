import React from 'react';
import Head from 'next/head';

const Meta: React.FC = () => {
    return (
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png?v=v0.0.1" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=v0.0.1" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=v0.0.1" />
            <link rel="manifest" href="/favicon/site.webmanifest?v=v0.0.1" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg?v=v0.0.1" color="#fc5753" />
            <link rel="shortcut icon" href="/favicon/favicon.ico?v=v0.0.1" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#fc5753" />
            <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
            <meta name="description" content={'Secretarium Blog'} />
        </Head>
    );
};

export default Meta;
