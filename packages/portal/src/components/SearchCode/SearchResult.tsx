import React from 'react';
import './SearchResult.css';
import MoaiPin from '../../assets/moai-pin.png';


interface Props {
    code: string;
    userId: string;
    time: number;
}

const SearchResult: React.FC<Props> = ({ code, userId, time }) => {

    const toDateTime = (timestamp) => {
        const d = new Date(timestamp / 1000000),
            dd = d.getDate(),
            m = d.getMonth() + 1,
            y = d.getFullYear(),
            h = d.getHours(),
            mi = d.getMinutes(),
            s = d.getSeconds();
        console.log(d);
        console.log(dd);
        const t = new Date(1995, 11, 17, 3, 24, 0);
        console.log(t.getTime());
        return (dd < 10 ? '0' : '') + dd + '.' + (m < 10 ? '0' : '') + m + '.' + y + ' - ' + (h < 10 ? '0' : '') + h + ':' + (mi < 10 ? '0' : '') + mi;
    };

    return (
        <div className="search-result-container">
            <div className="search-result-header">
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
                ID Number
            </div>
            <div className="search-result-body">
                User ID: {userId}
                <br></br>Time: {toDateTime(time)}
                <br></br>Barcode references: {code}
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
