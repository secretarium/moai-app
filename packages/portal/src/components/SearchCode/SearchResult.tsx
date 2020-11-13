import React from 'react';
import './SearchResult.css';
import MoaiPin from '../../assets/moai-pin.png';


const SearchResult: React.FC = () => {
    return (
        <div className="search-result-container">
            <div className="search-result-header">
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
                ID Number
            </div>
            <div className="search-result-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br></br>Barcode references: 012746283210
            </div>
            <div className="search-result-footer">
                <div className="search-result-button">
                    Message
                </div>
                <div className="search-result-button">
                    Phone
                </div>
            </div>
        </div >
    );
};

export default SearchResult;
