import React, { useEffect } from 'react';
import MoaiPin from '../../assets/moai-pin.png';
import { toDateTime } from '../../utils/timeHandler';
import { useHistory } from 'react-router-dom';
import { createConversation } from '../../actions/conversations';
import { withState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import style from './SearchResult.module.css';


type SearchResultProps = {
    userId: string;
    time: number;
};

const SearchResult = withState<SearchResultProps>()((s) => ({
    newConversation: s.conversations.newConversation
}), ({ userId, time, newConversation, dispatch }) => {

    const history = useHistory();

    useEffect(() => {
        if (newConversation) {
            history.push(`/chat/${newConversation.address}`);
        }
    }, [newConversation, history]);

    const onClick = (): void => {
        dispatch(createConversation('title', 'name', userId));
    };

    return (
        <div className={style.searchResultContainer}>
            <div className={style.searchResultHeader}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
                {/* {`User ID: ${userId}`} */}
            </div>
            <div className={style.searchResultBody}>
                {`User ID: ${userId}`}
                <br></br>Time: {toDateTime(time)}
                {/* <br></br>Barcode references: 0 */}
            </div>
            <div className={style.searchResultFooter}>
                <div className={style.searchResultButton} onClick={() => onClick()}>
                    <FontAwesomeIcon icon={faEnvelope} /> Message
                </div>
                {/* <div className={style.search-result-button}>
                    Phone
                </div> */}
            </div>
        </div >
    );
});

export default SearchResult;
