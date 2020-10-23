import { combineReducers } from 'redux';
import { system } from './system';
import { principal } from './principal';

const reducers = combineReducers({
    system,
    principal
});

export default reducers;
