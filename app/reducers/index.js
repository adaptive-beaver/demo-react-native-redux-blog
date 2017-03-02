/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 2/3/2017
 * Project: React Native Redux Boilerplate
 */

import { combineReducers } from 'redux';

import { DATA_AVAILABLE } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;

// Reducers are the ones in charge of updating the state of the app.
// Redux will automatically pass the current state of the app and the action occurred.
// It’s up to the reducer to realize if it needs to modify the state or not based on the action.type.
// That’s why almost every time our reducer will be a function containing a switch statement,
// which modifies and returns the state based on what action occurred.
// Its important that reducers never mutate the state in place,
// instead it should replace the keys that it needs to be changed.
// So if you look at all the cases, we never mutate state directly
// but instead use Object.assign which creates new object having the target fields replaced with the updated one.