import React from 'react';
import './common.css';
import MoaiPin from '../../assets/moai-pin.png';


const Legal: React.FC = () => {
    return (
        <div className="setting-page">
            <div className="setting-page-header">
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
                Legal
            </div>
        </div>
    );
};

export default Legal;
