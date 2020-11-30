import React, { useState } from 'react';
import './SearchCode.css';
import { DatePicker, TimePicker, Input } from 'antd';
import SearchResult from './SearchResult';
import { withState } from '../../store';
import { getExposed } from '../../actions';

const { Search } = Input;


const SearchExposed = withState()(
    (s) => ({
        exposed: s.searchResults.exposed
    }),
    ({ dispatch, exposed }) => {

        const [date, setDate] = useState<string | undefined>(undefined);
        const [time, setTime] = useState<string | undefined>(undefined);

        const toTimestamp = (date, time) => {
            console.log(date);
            console.log(time);
            const d = date.split('-');
            const t = time.split(':');
            const dt = new Date(d[0], d[1], d[2], t[0], t[1], t[2]);
            console.log(dt);
            console.log(dt.getTime());
            return dt.getTime();
        };


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
