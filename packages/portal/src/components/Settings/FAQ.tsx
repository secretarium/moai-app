import React from 'react';
import './FAQ.css';
import './common.css';
import MoaiPin from '../../assets/moai-pin.png';


const FAQ: React.FC = () => {
    return (
        <div className="setting-page">
            <div className="setting-page-header">
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', paddingRight: '10px' }} />
                FAQ
            </div>
        </div>
    );
};

export default FAQ;
