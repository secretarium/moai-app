import React from 'react';
import style from './Home.module.css';


const Home: React.FC = () => {

    return (
        <div className={style.containerHome}>
            <h1>Welcome to Moai</h1>
            <p className={style.infoHome}>
                Search COVID-19 test results and exposure risk using test barcode or location QR code.
                <br />
                <br />
                All information submitted in the portal is end-to-end encrypted.
            </p>
            <p className={style.learnMoreHome}>
                Learn more by visiting <a target="_blank" rel="noopener noreferrer" href="https://moaiapp.com/">moaiapp.com</a>
            </p>
        </div >
    );
};

export default Home;
