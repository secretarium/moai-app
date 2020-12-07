import React, { useEffect, useState } from 'react';
import './Home.css';
import { withState } from '../../store';
import { getLastMessage } from '../../actions';


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
        <div className="container-home">
            <h1>Welcome to Moai</h1>
            <p className="info-home">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="learn-more-home">
                Learn more by visiting <a target="_blank" rel="noopener noreferrer" href="https://moaiapp.com/">moaiapp.com</a>
            </p>
        </div >
    );
});

export default Home;
