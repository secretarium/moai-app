import React from 'react';
import './SearchResult.css';
import MoaiPin from '../../assets/moai-pin.png';
import { toDateTime } from '../../utils/timeHandler';


type Props = {
    userId: string;
    time: number;
};

const SearchResult: React.FC<Props> = ({ userId, time }) => {

    return (
        <div className="search-result-container">
            <div className="search-result-header">
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
                ID Number
            </div>
            <div className="search-result-body">
                User ID: {userId}
                <br></br>Time: {toDateTime(time)}
                <br></br>Barcode references: 0
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
