import React from 'react';
import './SearchCode.css';
import { useParams } from 'react-router-dom';


type ParamTypes = {
    code: string;
};

const SearchCode: React.FC = () => {
    const { code } = useParams<ParamTypes>();

    return (
        <div className="container-search">
            <div className="search-input">
                <i className="fas fa-search fa-3x" style={{ color: '#dfe0e2', padding: '10px' }} />
                <input placeholder={`Search ${code}...`} type="text" style={{ outline: 'none', border: 'none', fontSize: '34px' }} />
            </div>
            <div className="results">
                No results...
            </div>
        </div>
    );
};

export default SearchCode;
