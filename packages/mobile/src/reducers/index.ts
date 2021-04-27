import { combineReducers } from 'redux';
import { system } from './system';
import { conversations } from './conversations';
import { exposure } from './exposure';
import { immunity } from './immunity';

const reducers = combineReducers({
    system,
    conversations,
    exposure,
    immunity
});

export default reducers;
