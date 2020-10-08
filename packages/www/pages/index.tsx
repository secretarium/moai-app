import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import styles from './index-styles.module.css';
import mockOne from '../public/assets/images/mockup1.png';
import mockTwo from '../public/assets/images/mockup2.png';
import Link from 'next/link';
import PostTitle from '../components/post-title';
import Container from '../components/container';

const Index: React.FC = () => {
    return (
        <>
            <Layout>
                <Head>
                    <title>Moai</title>
                </Head>
                <section id="banner">
                    <Container>
                        <div className="mx-auto px-8 pt-8 lg:pb-30 relative flex flex-col lg:flex-row items-center">
                            <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
                                <PostTitle>Secure contact<br />tracing from Moai</PostTitle>
                                <p>
                                    Our quick and easy COVID-19 tracing system keeps your identity private and your location anonymous. Our app works on all Android and iOS devices and supports cross-border contact tracing.
                                </p>
                                <a href="#register" className="bg-accent-1 mt-8 py-3 px-8 text-lg rounded-full text-white inline-block">
                                    Register
                                </a>
                                <a href="#more" className="bg-white mt-8 py-3 px-8 text-lg rounded-full text-blue-900 border border-blue-900 inline-block">
                                    Discover More
                                </a>
                            </div>
                            <div className="lg:w-2/3 top-0 right-0 bottom-0 lg:mr-8 overflow-hidden" style={{
                                maxHeight: '50rem',
                                height: '30rem'
                            }}>
                                <div className={styles.bannerImageContainer}>
                                    <img alt="Chat screen" src={mockTwo} className={styles.bannerImageTwo} />
                                    <img alt="Main screen" src={mockOne} className={styles.bannerImageOne} />
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
                <section id="venues" className="bg-gray-100">
                    <Container>
                        <div className="flex">
                            <div className="w-3/4 text-left px-8 py-20">
                                <h2 className="text-4xl pb-5">
                                    Set up a location for contact tracing
                                </h2>
                                <h3 className="text-2xl text-gray-700 pb-16">
                                    Instantly generate an anonymous QR code to allow people to scan into your location quickly. Everything else is handled securely in the app.
                                </h3>
                                <p className="text-xl pb-12">
                                    <ul>
                                        <li>Your business information stays private </li>
                                        <li>No need to handle anybody’s personal data </li>
                                        <li>Helps keep your location COVID-19 compliant</li>
                                    </ul>
                                    <b>It only takes a minute to set up secure track and trace for your location</b>
                                </p>
                                <Link href="/codes">
                                    <a href="#more" className="bg-white mt-8 py-3 px-8 text-lg rounded-full text-accent-2 border border-accent-2 inline-block">
                                        Generate free QR codes
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </section>
                <section id="guests" className="bg-white text-right">
                    <Container>
                        <div className="flex">
                            <div className="w-1/4"></div>
                            <div className="w-3/4 text-right px-8 py-20">
                                <h2 className="text-4xl pb-5">
                                    Check in without providing<br /> personal information
                                </h2>
                                <h3 className="text-2xl text-gray-700 pb-16">
                                    The secure app traces risk of infection without ever knowing who you are or where you’ve been. Scan into a location using its anonymous QR code, without having to disclose any personal information. If there’s any risk you’ve been exposed to COVID-19, you’ll be notified vie the app.
                                </h3>
                                <p className="text-xl">
                                    <ul>
                                        <li>None of your personal data is collected</li>
                                        <li>Does not use GPS or Bluetooth to track you</li>
                                        <li>The government does not have access to your information</li>
                                        <li>The app cannot be used to track you while you quarantine</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </Container>
                </section>
                <section id="register" className="bg-gray-100">
                    <Container>
                        <div className="text-center px-8 py-20">
                            <h2 className="text-4xl pb-5">
                                Moai is almost ready.
                            </h2>
                            <h3 className="text-2xl text-accent-2 pb-5">
                                Enter your email below and we’ll let you know as soon as it’s launched.
                            </h3>
                            <form name="mc-embedded-subscribe-form" target="_blank" action="https://moaiapp.us17.list-manage.com/subscribe/post?u=1bbe9d3ad8430f833640de63c&id=284f13df99" method="post" id="mc-embedded-subscribe-form">
                                <input id="mce-EMAIL" type="email" name="EMAIL" required className="py-2 px-5 text-xl w-full sm:w-1/2 text-center border-b border-accent-2" placeholder="Enter your email address" />
                                <br /><br />
                                <button id="mc-embedded-subscribe" className="bg-blue-900 mt-8 py-3 px-8 text-lg rounded-full text-white inline-block" type="submit">
                                    Register for updates
                                </button>
                            </form>
                        </div>
                    </Container>
                </section>
            </Layout>
        </>
    );
};

export default Index;
