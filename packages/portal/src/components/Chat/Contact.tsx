import React from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';


interface Props {
    conversationID: number;
    token: number;
}

const Contact: React.FC<Props> = ({ conversationID, token }) => {
    return (
        <>
            <Link className="contact" to={{
                pathname: `/chat/${conversationID}`,
                state: { token: token }
            }}>
                <i className="fas fa-user-circle fa-3x" style={{ color: '#203864' }} />
                <div className="contact-info">
                    <h2>Conversation ID {conversationID}</h2>
                    <p>Last message...</p>
                </div>
            </Link>
        </>
    );
};

export default Contact;