import React, { useState, useEffect } from 'react';
import { Key, SCP, Constants } from '@secretarium/connector';
import './ContactsBar.css';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Contact from './Contact';

const scp = new SCP();
const isDev = process.env.NODE_ENV === 'development';

const ContactsBar: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [fetchedContacts, setFetchedContacts] = useState(false);
    const [pageError, setPageError] = useState<string>();

    useEffect(() => {
        if (isConnected && fetchedContacts) {
            const query = scp.newQuery('moai', 'get-conversations', `${Date.now()}`, {});
            query.onResult?.(() => {
                // some dispatch actions
                setFetchedContacts(true);
            });
            query.onError?.((error: any) => {
                console.error('Error', error);
                setPageError(isDev ? `Query error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                setIsConnected(false);
            });
            query.send?.()
                .catch((error) => {
                    console.error('Error', error);
                    setPageError(isDev ? `Query error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                    setIsConnected(false);
                });
        }
    });

    return (
        <div className="contacts-bar">
            <div className="search">
                <div className="search-container">
                    <SearchOutlined style={{ fontSize: '24px', color: '#dfe0e2', padding: '10px' }} />
                    <input placeholder="Search..." type="text" style={{ outline: 'none', border: 'none' }} />
                </div>
            </div>
            <div className="chats">
                <Contact conversationID={123} />
                <Contact conversationID={456} />
            </div>
        </div>
    );
};

export default ContactsBar;
