import React from 'react';
import './SearchCode.css';
import { useParams } from 'react-router-dom';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SearchResult from './SearchResult';


interface ParamTypes {
    code: string;
}

const SearchCode: React.FC = () => {

    const { code } = useParams<ParamTypes>();

    // eslint-disable-next-line prefer-const
    let composition = null;
    if (code === 'barcode') {
        composition =
            <div className={`search-input-${code}`}>
                <SearchOutlined style={{ fontSize: '24px', color: '#dfe0e2', padding: '10px' }} />
                <input placeholder={'Search Test ID...'} type="text" style={{ outline: 'none', border: 'none' }} />
            </div>;
    } else if (code === 'qrcode') {
        composition = <>
            <div className={`search-input-${code}`}>
                <SearchOutlined style={{ fontSize: '24px', color: '#dfe0e2', padding: '10px' }} />
                <input placeholder={'Search Venue Code...'} type="text" style={{ outline: 'none', border: 'none' }} />
            </div>
            <div className={`search-input-${code}`}>
                <input placeholder={'Date...'} type="text" style={{ outline: 'none', border: 'none', marginLeft: '10px' }} />
            </div>
            <div className={`search-input-${code}`}>
                <input placeholder={'Time...'} type="text" style={{ outline: 'none', border: 'none', marginLeft: '10px' }} />
            </div>
        </>;
    }


    return (
        <div className="container-search">
            <div className="search-header">
                {composition}
            </div>
            <div className="results">
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />
            </div>
        </div>
    );
};

export default SearchCode;
