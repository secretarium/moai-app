import React from 'react';
import './SearchCode.css';
import { Input } from 'antd';
import SearchResult from './SearchResult';
import { withState } from '../../store';
import { getTested } from '../../actions';

const { Search } = Input;


const SearchTested = withState()(
    (s) => ({
        tested: s.searchResults.tested
    }),
    ({ dispatch, tested }) => {


        return (
            <div className="container-search">
                <div className="search-header">
                    <div className="search-input-code">
                        <Search placeholder="Search Test ID..." style={{ outline: 'none', border: 'none', borderRadius: '25px' }} onSearch={(value, event) => {
                            event.preventDefault();
                            dispatch(getTested(value));
                        }} />
                    </div>
                </div>
                <div className="results">
                    {tested ? <SearchResult userId={tested.userId} time={tested.time} /> : 'No result'}
                </div>
            </div>
        );
    }
);

export default SearchTested;
