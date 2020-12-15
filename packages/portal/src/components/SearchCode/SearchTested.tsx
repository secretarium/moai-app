import React, { useState, useEffect } from 'react';
import './SearchCode.css';
import { Input, Alert } from 'antd';
import SearchResult from './SearchResult';
import { withState } from '../../store';
import { getTested, clearSearchErrors, clearSearchResults } from '../../actions';
import { useLocation } from 'react-router-dom';


const { Search } = Input;


const SearchTested = withState()(
    (s) => ({
        tested: s.searchResults.tested,
        searchTestedError: s.searchResults.searchTestedError
    }),
    ({ dispatch, tested, searchTestedError }) => {

        const location = useLocation();
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [errorsClear, setErrorsClear] = useState<boolean>(false);

        useEffect(() => {
            dispatch(clearSearchResults());
        }, [location, dispatch]);

        useEffect(() => {
            if (searchTestedError && errorMessage !== searchTestedError) {
                setErrorMessage(searchTestedError);
                setErrorsClear(true);
            }
        }, [errorMessage, searchTestedError]);

        const onSearch = (value: string, event: React.MouseEvent<HTMLElement, MouseEvent> | React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void => {
            event.preventDefault();
            dispatch(getTested(value));
        };

        const clearErrors = (): void => {
            if (errorsClear) {
                setErrorMessage(undefined);
                dispatch(clearSearchErrors());
                setErrorsClear(false);
            }
        };

        return (
            <div className="container-search">
                <div className="search-header">
                    <div className="search-input-code">
                        <Search placeholder="Search Test ID..." style={{ outline: 'none', border: 'none', borderRadius: '25px' }}
                            onChange={(): void => clearErrors()} onSearch={(value, event) => onSearch(value, event)} />
                    </div>
                </div>
                <div className="results">
                    {errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
                    {tested ? <SearchResult userId={tested.userId} time={tested.time} /> : null}
                </div>
            </div>
        );
    }
);

export default SearchTested;
