import React from 'react';
import './SearchCode.css';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SearchResult from './SearchResult';


const SearchExposed: React.FC = () => {

    return (
        <div className="container-search">
            <div className="search-header">
                <div className="search-input-qrcode">
                    <SearchOutlined style={{ fontSize: '24px', color: '#dfe0e2', padding: '10px' }} />
                    <input placeholder={'Search Venue Code...'} type="text" style={{ outline: 'none', border: 'none' }} />
                </div>
                <div className="search-input-qrcode">
                    <input placeholder={'Date...'} type="text" style={{ outline: 'none', border: 'none', marginLeft: '10px' }} />
                </div>
                <div className="search-input-qrcode">
                    <input placeholder={'Time...'} type="text" style={{ outline: 'none', border: 'none', marginLeft: '10px' }} />
                </div>
            </div>
            <div className="results">
                <SearchResult code={'123'} userId={'123'} time={1589846462791279700} />
                <SearchResult code={'123'} userId={'123'} time={1589846462791279700} />
                <SearchResult code={'123'} userId={'123'} time={1589846462791279700} />
                <SearchResult code={'123'} userId={'123'} time={1589846462791279700} />
                <SearchResult code={'123'} userId={'123'} time={1589846462791279700} />
            </div>
        </div>
    );
};

export default SearchExposed;
