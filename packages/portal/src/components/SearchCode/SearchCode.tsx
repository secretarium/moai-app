import React from 'react';
import './SearchCode.css';
import { useParams } from 'react-router-dom';
import SearchOutlined from '@ant-design/icons/SearchOutlined';


interface ParamTypes {
    code: string;
}

const SearchCode: React.FC = () => {
    const { code } = useParams<ParamTypes>();

    return (
        <div className="container-search">
            <div className="search-header">
                <div className="search-input">
                    <SearchOutlined style={{ fontSize: '24px', color: '#dfe0e2', padding: '10px' }} />
                    <input placeholder={`Search ${code}...`} type="text" style={{ outline: 'none', border: 'none' }} />
                </div>
            </div>
            <div className="results">
                No results...
            </div>
        </div>
    );
};

export default SearchCode;
