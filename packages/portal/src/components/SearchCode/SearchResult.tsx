import React, { useEffect } from 'react';
import './SearchResult.css';
import MoaiPin from '../../assets/moai-pin.png';
import { toDateTime } from '../../utils/timeHandler';
import { useHistory } from 'react-router-dom';
import { createConversation } from '../../actions/conversations';
import { withState } from '../../store';


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
        <div className="search-result-container">
            <div className="search-result-header">
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
                {/* {`User ID: ${userId}`} */}
            </div>
            <div className="search-result-body">
                {`User ID: ${userId}`}
                <br></br>Time: {toDateTime(time)}
                {/* <br></br>Barcode references: 0 */}
            </div>
            <div className="search-result-footer">
                <div className="search-result-button" onClick={() => onClick()}>
                    <i className="far fa-envelope fa-lg" style={{ paddingRight: '8px' }} /> Message
                </div>
                {/* <div className="search-result-button">
                    Phone
                </div> */}
            </div>
        </div >
    );
});

export default SearchResult;
