import React, { useState, useEffect } from 'react';
import { Input, Alert, Radio, RadioChangeEvent } from 'antd';
import SearchResult from './SearchResult';
import { withState } from '../../store';
import { getTested, clearSearchErrors, clearSearchResults } from '../../actions';
import { useLocation } from 'react-router-dom';
import style from './SearchCode.module.css';
import { useTranslation } from 'react-i18next';


const { Search } = Input;


const SearchTested = withState()(
    (s) => ({
        tested: s.searchResults.tested,
        searchTestedError: s.searchResults.searchTestedError
    }),
    ({ dispatch, tested, searchTestedError }) => {

        const location = useLocation();
        const [testId, setTestId] = useState<string>();
        const [testType, setTestType] = useState<'covidTest' | 'covidAntibodyTest'>();
        const { t } = useTranslation();
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
            setErrorMessage(undefined);
            setTestId(value);
            testType ? dispatch(getTested(value, testType)) : setErrorMessage(t('APP_NO_TEST_TYPE'));
        };

        const clearErrors = (): void => {
            if (errorsClear) {
                setErrorMessage(undefined);
                dispatch(clearSearchErrors());
                setErrorsClear(false);
            }
        };

        const onSelect = (event: RadioChangeEvent): void => {
            setTestType(event.target.value);
        };

        return (
            <div className={style.containerSearch}>
                <div className={style.searchHeader}>
                    <div className={style.searchInputCode}>
                        <Search placeholder={t('APP_SEARCH_TEST_ID')} style={{ outline: 'none', border: 'none', borderRadius: '25px' }}
                            onChange={(): void => clearErrors()} onSearch={(value, event) => onSearch(value, event)} />
                    </div>
                    <div>
                        <Radio.Group onChange={onSelect} value={testType}>
                            <Radio value={'covidTest'}>Infection</Radio>
                            <Radio value={'covidAntibodyTest'}>Antibody</Radio>
                        </Radio.Group>
                    </div>
                </div>
                <div className={style.results}>
                    {errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
                    {tested ? <SearchResult testType={testType} testId={testId} userId={tested.userId} time={tested.time} /> : null}
                </div>
            </div>
        );
    }
);

export default SearchTested;
