import { combineReducers } from 'redux';
import { system } from './system';
import { principal } from './principal';
import { conversations } from './conversations';

const reducers = combineReducers({
    system,
    principal,
    conversations
});

export default reducers;
