import Head from 'next/head';
import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import QRCodeGenerator from '../components/qrcode-generator';

const HomePage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Moai Codes</title>
            </Head>
            <Container>
                <section className="mt-20 mb-8 md:mb-12">
                    <h1 className="text-6xl md:text-7xl tracking-tighter leading-tight md:pr-8 text-center">
                        Set up Moai at your location
                    </h1>
                </section>
                <section id="legal" className="mb-20">
                    <QRCodeGenerator />
                </section>
            </Container>
        </Layout>
    );
};

export default HomePage;
