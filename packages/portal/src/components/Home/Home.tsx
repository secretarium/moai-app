import React, { useEffect, useState } from 'react';
import { withState } from '../../store';
import { getLastMessage } from '../../actions';
import style from './Home.module.css';


const Home = withState()((s) => ({
    conversationList: s.conversations.conversationList
}), ({ conversationList, dispatch }) => {

    const [fetchedContacts, setFetchedContacts] = useState(false);

    useEffect(() => {
        if (fetchedContacts === false && conversationList.length > 0) {
            setFetchedContacts(true);
            conversationList.map((convo) => dispatch(getLastMessage(convo.address, convo.token)));
        }
    }, [dispatch, fetchedContacts, conversationList]);

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
});

export default Home;
