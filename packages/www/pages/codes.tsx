import Head from 'next/head';
import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import PostTitle from '../components/post-title';
import QRCodeGenerator from '../components/qrcode-generator';

const HomePage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Moai Codes</title>
            </Head>
            <Container>
                <PostTitle>Set up Moai at your location</PostTitle>
                <section id="legal" className="mb-20">
                    <QRCodeGenerator />
                </section>
            </Container>
        </Layout>
    );
};

export default HomePage;
