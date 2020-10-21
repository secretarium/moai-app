import React from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';


interface Props {
    conversationID: number;
}

const Contact: React.FC<Props> = ({ conversationID }) => {
    return (
        <>
            <Link className="contact" to={`/chat/${conversationID}`}>
                <i className="fas fa-user-circle fa-3x" style={{ color: '#203864' }} />
                <div className="contact-info">
                    <h2>ID number {conversationID}</h2>
                    <p>Last message...</p>
                </div>
            </Link>
        </>
    );
};

export default Contact;