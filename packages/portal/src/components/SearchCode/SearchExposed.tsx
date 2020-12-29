import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker, Input, Alert } from 'antd';
import SearchResult from './SearchResult';
import { withState } from '../../store';
import { getExposed, clearSearchErrors, clearSearchResults } from '../../actions';
import { toTimestamp } from '../../utils/timeHandler';
import { useLocation } from 'react-router-dom';
import style from './SearchCode.module.css';


const { Search } = Input;


const SearchExposed = withState()(
    (s) => ({
        exposed: s.searchResults.exposed,
        searchExposedError: s.searchResults.searchExposedError
    }),
    ({ dispatch, exposed, searchExposedError }) => {

        const location = useLocation();
        const [date, setDate] = useState<string | undefined>(undefined);
        const [time, setTime] = useState<string | undefined>(undefined);
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [errorsClear, setErrorsClear] = useState<boolean>(false);

        useEffect(() => {
            dispatch(clearSearchResults());
        }, [location, dispatch]);

        useEffect(() => {
            if (searchExposedError && errorMessage !== searchExposedError) {
                setErrorMessage(searchExposedError);
                setErrorsClear(true);
            }
        }, [errorMessage, searchExposedError]);

        useEffect(() => {
            if (exposed !== null && exposed.length < 1) {
                setErrorMessage('No results.');
            }
        }, [exposed]);

        const onSearch = (value: string, event: React.MouseEvent<HTMLElement, MouseEvent> | React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void => {
            event.preventDefault();
            setErrorMessage(undefined);
            if (date === undefined || time === undefined) {
                setErrorMessage('Please input a date.');
            } else {
                dispatch(getExposed(value, toTimestamp(date, time)));
            }
        };

        const clearErrors = (): void => {
            if (errorsClear) {
                setErrorMessage(undefined);
                dispatch(clearSearchErrors());
                setErrorsClear(false);
            }
        };

        return (
            <div className={style.containerSearch}>
                <div className={style.searchHeader}>
                    <div className={style.searchInputCode}>
                        <Search placeholder="Search Location Code..." style={{ outline: 'none', border: 'none', borderRadius: '25px' }}
                            onChange={(): void => clearErrors()} onSearch={(value, event) => onSearch(value, event)} />
                    </div>
                    <div className={style.searchInputCode}>
                        <DatePicker style={{ color: '#dfe0e2', outline: 'none', border: 'none', marginLeft: '10px' }}
                            onClick={(): void => clearErrors()} onChange={(value, dateString) => setDate(dateString)} />
                    </div>
                    <div className={style.searchInputCode}>
                        <TimePicker style={{ color: '#dfe0e2', outline: 'none', border: 'none', marginLeft: '10px' }}
                            onClick={(): void => clearErrors()} onChange={(value, dateString) => setTime(dateString)} />
                    </div>
                </div>
                <div className={style.results}>
                    {errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
                    {exposed !== null ? exposed.map(single => <SearchResult key={single.userId} userId={single.userId} time={single.time} />) : null}
                </div>
            </div >
        );
    }
);

export default SearchExposed;
