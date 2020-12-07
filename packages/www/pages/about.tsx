import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import PostTitle from '../components/post-title';
import Container from '../components/container';

const About: React.FC = () => {
    return (
        <>
            <Layout>
                <Head>
                    <title>Moai About Us</title>
                </Head>
                <Container>
                    <section id="about" className="mb-20  px-8">
                        <PostTitle>About us</PostTitle>
                        <p className="text-lg leading-9 pb-10">
                            Moai is a smart, secure contact tracing solution created by Secretarium, a deep-tech startup founded in 2016 with the aim of building useful technology that never compromises anyone’s privacy. Unlike the NHS contact tracing technology, our app is compatible with all iOs and Android devices. Our solution is cross-border, enabling notifications for those who may have been affected outside the UK.
                            <br />
                            <br />
                            The founders are from the world of banking, but they left to pursue projects that would solve problems around handling highly sensitive data: enforcing consent, and guaranteeing privacy by design and by default.
                        </p>
                        <h4 className="text-2xl lg:text-3xl tracking-tighter">Why "Moai" — 模合 ?</h4>
                        <p className="text-lg leading-9 pb-10">
                            A Japanese word which translates to 'meeting for a common purpose', "moai" describes social support groups that came together in the community to look out for each other during hard times.
                            <br />
                            <br />
                            Our technology helps communities protect each other during hard times: it can track and stop the spread of diseases like COVID-19 efficiently, without sacrificing individual rights to privacy.
                        </p>
                        <h4 className="text-2xl lg:text-3xl tracking-tighter">Why it’s smart ?</h4>
                        <p className="text-lg leading-9 pb-10">
                            Until now, privacy has been limited to encrypting data during transit and storage. Our technology keeps data private at all times, even while it’s being used, through a combination of tamper-proof code and secure hardware. Because the data is always encrypted, even somebody with physical access to the storage centre would not be able to extract any information.
                            <br />
                            <br />
                            The privacy-preserving technology used in Moai is the latest generation in confidential computing, and has already been tried and tested by financial institutions in the UK and Europe. No personal information is required to use the app, and we don’t access your phone’s geolocation system.
                        </p>
                        <h4 className="text-2xl lg:text-3xl tracking-tighter">Stopping the spread of COVID-19</h4>
                        <p className="text-lg leading-9 pb-10">
                            The challenge: How can we tell who has been in contact with an infected person, without breaking data protection rules? If we monitor where people are and who they have been near, it’s difficult to maintain privacy: research has shown that just four pieces of location data is enough to re-identify an individual [link to article]. A truly private solution – like Moai – would require that nobody can ever access the data gathered.
                        </p>
                        <h4 className="text-2xl lg:text-3xl tracking-tighter">Supported by UK Research and Innovation (UKRI)</h4>
                        <p className="text-lg leading-9 pb-10">
                            UKRI is a public body funded by the government to support the development of new ideas. Through Innovate UK, they have provided a series of grants to companies to work on solving the problem of “track and trace” without a breach of privacy.
                        </p>
                        <p className="text-lg leading-9 pb-10">
                            <b>We’d love to discuss how our technology could meet your business requirements. Get in touch at <a href="mailto:team@moaiapp.com" className="text-accent-2">team@moaiapp.com</a>. </b>
                        </p>
                    </section>
                </Container>
            </Layout>
        </>
    );
};

export default About;
