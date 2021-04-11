import { combineReducers } from 'redux';
import { system } from './system';
import { conversations } from './conversations';
import { exposure } from './exposure';

const reducers = combineReducers({
    system,
    conversations,
    exposure
});

export default reducers;
