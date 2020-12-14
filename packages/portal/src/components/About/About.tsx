import React, { useEffect, useState } from 'react';
import './About.css';
import { version as packageVersion } from '../../../package.json';
import ReactMarkdown from 'react-markdown';


const About: React.FC = () => {

    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [disclaimer, setDisclaimer] = useState<string>('Loading');
    const [licenses, setLicenses] = useState<any>({ status: 'Loading' });

    useEffect(() => {
        if (!hasFetched) {
            fetch('/disclaimer.txt')
                .then((result) => result.text())
                .then(text => setDisclaimer(text))
                .catch(() => setDisclaimer('An error occured'));
            fetch('/licenses.json')
                .then((result) => result.json())
                .then(text => setLicenses(text))
                .catch(() => setDisclaimer('An error occured'));
            setHasFetched(true);
        }
    }, [hasFetched]);

    return (
        <div className="container-about">
            <h1>{`About Moai v${packageVersion}`}</h1>
            <div>
                <p>
                    Moai is a smart, secure contact tracing solution created by Secretarium,
                    a deep-tech startup founded in 2016 with the aim of building useful technology
                    that never compromises anyone’s privacy.
                    The founders are from the world of banking, but they left to pursue projects
                    that would solve problems around handling highly sensitive data:
                    enforcing consent and guaranteeing privacy by design and by default.
                </p>
            </div>
            <div>
                <p>
                    Moai incroporates components from the projects listed below.
                    The original copyright notices and the licenses under which
                    Secretarium Ltd. received such components are set forth below for informational purposes.
                    Secretarium Ltd. reserves all rights not expressly granted herein,
                    whether by implication, estoppel or otherwise.
                </p>
                <h2>External licenses</h2>
                <div className="licenses">
                    <ReactMarkdown source={disclaimer} />
                </div>
                <h2>List of top-level dependencies</h2>
                {console.log(licenses)}
                {/* {Object.keys(licenses).map(function (key) {
                    return <div>Key: {key}, Value: {licenses[key]}</div>;
                })} */}
            </div>
        </div>
    );
};

export default About;
