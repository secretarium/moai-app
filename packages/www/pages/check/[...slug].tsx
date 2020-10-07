import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Container from '../../components/container';
import Layout from '../../components/layout';
import PostTitle from '../../components/post-title';

const FAQPage: React.FC = () => {
    const router = useRouter();
    const { slug } = router.query;
    return (
        <Layout>
            <Head>
                <title>Moai Checkin</title>
            </Head>
            <Container>
                <PostTitle>Checking in</PostTitle>
                <section id="legal" className="mb-20">
                    Prefer not to give your details?
                    <br />
                    <b>Download the app to check in anonymously</b>
                    <br />
                    <br />
                You can also check in here, but we will need a few details. Don't worry, your data is safe and will be secured and encrypted at all times.
                    <br />
                    <br />
                First name
                    <br />
                Surname
                    <br />
                Phone number
                    <br />
                    <br />
                    <a target="_blank" className="btn dl-pdf">Check in</a>
                </section>
            </Container>
        </Layout>
    );
};

export default FAQPage;