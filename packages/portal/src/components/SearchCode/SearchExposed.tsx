import React, { useState } from 'react';
import './SearchCode.css';
import { DatePicker, TimePicker, Input } from 'antd';
import SearchResult from './SearchResult';
import { withState } from '../../store';
import { getExposed } from '../../actions';
import { toTimestamp } from '../../utils/timeHandler';

const { Search } = Input;


const SearchExposed = withState()(
    (s) => ({
        exposed: s.searchResults.exposed
    }),
    ({ dispatch, exposed }) => {

        const [date, setDate] = useState<string | undefined>(undefined);
        const [time, setTime] = useState<string | undefined>(undefined);

        return (
            <div className="container-search">
                <div className="search-header">
                    <div className="search-input-code">
                        <Search placeholder="Search Venue Code..." style={{ outline: 'none', border: 'none', borderRadius: '25px' }} onSearch={(value, event) => {
                            event.preventDefault();
                            dispatch(getExposed(value, toTimestamp(date, time)));
                        }} />
                    </div>
                    <div className="search-input-code">
                        <DatePicker style={{ color: '#dfe0e2', outline: 'none', border: 'none', marginLeft: '10px' }} onChange={(value, dateString) => setDate(dateString)} />
                    </div>
                    <div className="search-input-code">
                        <TimePicker style={{ color: '#dfe0e2', outline: 'none', border: 'none', marginLeft: '10px' }} onChange={(value, dateString) => setTime(dateString)} />
                    </div>
                </div>
                <div className="results">
                    {exposed ? exposed.map(single => <SearchResult userId={single.userId} time={single.time} />) : 'No result'}
                </div>
            </div >
        );
    }
);

export default SearchExposed;
