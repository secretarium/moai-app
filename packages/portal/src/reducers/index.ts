import { combineReducers } from 'redux';
import { system } from './system';
import { principal } from './principal';
import { messages } from './messages';

const reducers = combineReducers({
    system,
    principal,
    messages
});

export default reducers;
