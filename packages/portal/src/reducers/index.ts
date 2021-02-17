import { combineReducers } from 'redux';
import { system } from './system';
import { principal } from './principal';
import { conversations } from './conversations';
import { searchResults } from './searchResults';
import { vault } from './vault';

const reducers = combineReducers({
    system,
    principal,
    conversations,
    searchResults,
    vault
});

export default reducers;
