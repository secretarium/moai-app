import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import PostTitle from '../components/post-title';
import Container from '../components/container';

const Legal: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Moai Privacy Notice</title>
            </Head>
            <Container>

                <PostTitle>Privacy Policy</PostTitle>
                <section id="legal" className="mb-20">
                    <p className="text-lg leading-9 pb-10">
                        Your privacy is literally our main concern, so here is everything you need to know about the way your personal information is collected and used when you interact with the Moai website.
                    </p>
                    <h4 className="text-2xl lg:text-3xl tracking-tighter">Collection of Routine Information</h4>
                    <p className="text-lg leading-9 pb-10">
                        Like most websites, our website may track basic information about visitors. None of this information can personally identify you as a specific visitor to this website. It is tracked for routine administration and maintenance purposes only. This includes, but is not limited to, IP addresses, browser details, timestamps and referring pages.
                    </p>
                    <h4 className="text-2xl lg:text-3xl tracking-tighter">Cookies</h4>
                    <p className="text-lg leading-9 pb-10">
                        We do not use cookies to store information about your preferences or history.
                    </p>
                    <h4 className="text-2xl lg:text-3xl tracking-tighter">Advertisement and Other Third Parties</h4>
                    <p className="text-lg leading-9 pb-10">
                        We do not display advertisements and do not collect information to this end.
                    </p>
                    <h4 className="text-2xl lg:text-3xl tracking-tighter">Links to Third Party Websites</h4>
                    <p className="text-lg leading-9 pb-10">
                        Sometimes we provide links to other websites. We are not responsible for the privacy policies on these websites and they may differ from our own. Please check them out.
                    </p>
                    <h4 className="text-2xl lg:text-3xl tracking-tighter">Security</h4>
                    <p className="text-lg leading-9 pb-10">
                        We do everything we can to secure your personal information, but please remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. We promise to do our best to use commercially acceptable means of protecting your personal information, however we cannot guarantee its absolute security.
                    </p>
                    <h4 className="text-2xl lg:text-3xl tracking-tighter">Changes To This Privacy Policy</h4>
                    <p className="text-lg leading-9 pb-10">
                        This Privacy Policy is effective as of August 2020. If any details of our policy change, this page will be updated, and the changes posted will be effective immediately.<br />
                    We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. If we make any major changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.
                    </p >
                    <h4 className="text-2xl lg:text-3xl tracking-tighter">Contact Information</h4>
                    <p className="text-lg leading-9 pb-10">
                        For any questions or concerns regarding the Privacy Policy, please send us an email to contact@moaiapp.com.
                    </p>
                </section>
            </Container>
        </Layout>
    );
};

export default Legal;
