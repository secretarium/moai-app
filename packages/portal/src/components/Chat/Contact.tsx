import React from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import MoaiPin from '../../assets/moai-pin.png';



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
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', paddingRight: '10px' }} />
                <div className="contact-info">
                    <h2>ID {conversationID}</h2>
                    <p>Last message...</p>
                </div>
            </Link>
        </>
    );
};

export default Contact;