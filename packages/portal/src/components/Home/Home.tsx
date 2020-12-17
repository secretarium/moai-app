import React from 'react';
import './Home.css';


const Home: React.FC = () => {

    return (
        <div className="container-home">
            <h1>Welcome to Moai</h1>
            <p className="info-home">
                Search COVID-19 test results and exposure risk using test barcode or location QR code.
                <br />
                <br />
                All information submitted in the portal is end-to-end encrypted.
            </p>
            <p className="learn-more-home">
                Learn more by visiting <a target="_blank" rel="noopener noreferrer" href="https://moaiapp.com/">moaiapp.com</a>
            </p>
        </div >
    );
};

export default Home;
