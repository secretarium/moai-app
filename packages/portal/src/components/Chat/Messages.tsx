import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { Key, SCP, Constants } from '@secretarium/connector';
import './Messages.css';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import Message from './Message';
import { useParams } from 'react-router-dom';

const scp = new SCP();
const isDev = process.env.NODE_ENV === 'development';

interface ParamTypes {
    id: string;
}

const Messages: React.FC = () => {
    const { id } = useParams<ParamTypes>();

    const [isConnected, setIsConnected] = useState(false);
    const [fetchedConversation, setFetchedConversation] = useState(false);
    const [token, setToken] = useState();
    const [pageError, setPageError] = useState<string>();
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log(id);
        if (isConnected && fetchedConversation) {
            const query = scp.newQuery('moai', 'get-conversation', `${Date.now()}`, {
                id: id,
                token: token
            });
            query.onResult?.(() => {
                // some dispatch actions
                setFetchedConversation(true);
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

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('you sent the following message: ', message);
        const transaction = scp.newTx('moai', 'send-message', `${Date.now()}`, {
            id: id,
            token: token,
            text: message
        });
        setMessage('');
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <div className="messages">
            <div className="messages-header">
                <div className="messages-header-info">
                    <h2>ID number {id}</h2>
                </div>
                <MoreOutlined style={{ fontSize: '26px', color: '#203864' }} />
            </div>
            <div className="messages-body">
                <Message username="ID 1234" message="Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Phasellus a commodo sem, et mattis neque.
                Suspendisse at arcu mauris. Pellentesque ac dapibus libero. Donec vitae
                nunc mauris. Ut posuere odio ac nisi tincidunt, sit amet faucibus lorem finibus." timestamp="1:23 pm" isSender={false} />
                <Message username="nhs worker" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a commodo sem, et mattis neque."
                    timestamp="1:24 pm" isSender={true} />
            </div>
            <div className="messages-footer">
                <form>
                    <input value={message} onChange={onChange} type="text" placeholder="Type a new message..." />
                    <button onClick={onClick} type="submit">Send message</button>
                </form>
                <i className="fas fa-paper-plane fa-2x" style={{ color: '#1ca8e1', padding: '10px' }} />
            </div>
        </div>
    );
};

export default Messages;