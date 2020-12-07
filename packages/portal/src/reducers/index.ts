import { combineReducers } from 'redux';
import { system } from './system';
import { tracer } from './tracer';
import { conversations } from './conversations';
import { searchResults } from './searchResults';
import { vault } from './vault';

const reducers = combineReducers({
    system,
    tracer,
    conversations,
    searchResults,
    vault
});

export default reducers;
