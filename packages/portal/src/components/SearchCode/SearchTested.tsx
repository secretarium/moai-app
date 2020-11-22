import React, { useState, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import './SearchCode.css';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SearchResult from './SearchResult';
import { withState } from '../../store';
import { getTested } from '../../actions';


const SearchCode = withState()(
    (s) => ({
        tested: s.searchResults.tested
    }),
    ({ dispatch, tested }) => {

        const [barcode, setBarcode] = useState(null);

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            setBarcode(e.target.value);
            console.log(e.target.value);
        };

        const onKeyPress = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(getTested(barcode));
        };

        return (
            <div className="container-search">
                <div className="search-header">
                    <form className="search-input-barcode" onSubmit={onKeyPress}>
                        <SearchOutlined style={{ fontSize: '24px', color: '#dfe0e2', padding: '10px' }} />
                        <input placeholder={'Search Test ID...'} type="text" style={{ outline: 'none', border: 'none' }} onChange={onChange} />
                    </form>
                </div>
                <div className="results">
                    {tested ? <SearchResult code={barcode} userId={tested.userId} time={tested.time} /> : 'No result'}
                </div>
            </div>
        );
    }
);

export default SearchCode;
