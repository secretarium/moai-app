import { combineReducers } from 'redux';
import { system } from './system';
import { conversations } from './conversations';

const reducers = combineReducers({
    system,
    conversations
});

export default reducers;
