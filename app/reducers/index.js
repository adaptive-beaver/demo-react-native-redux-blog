/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 6/29/2017
 * Project: React Native Redux Quotes App with CRUD operations
 */

'use strict';

import { combineReducers } from 'redux';
var { AsyncStorage } = require('react-native');

import { QUOTES_AVAILABLE, ADD_QUOTE, UPDATE_QUOTE, DELETE_QUOTE } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { quotes: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_QUOTE:
            var quotes =  cloneObject(state.quotes) //clone the current state
            quotes.unshift(action.quote); //add the new quote to the top
            state = Object.assign({}, state, { quotes: quotes});
            return state;

        case QUOTES_AVAILABLE:
            state = Object.assign({}, state, { quotes: action.quotes, loading:false });
            return state;

        case UPDATE_QUOTE:
            var quote = action.quote;
            var quotes =  cloneObject(state.quotes) //clone the current state
            var index = getIndex(quotes, quote.id); //find the index of the quote with the quote id passed
            if (index !== -1) {
                quotes[index]['author'] = quote.author;
                quotes[index]['quote'] = quote.quote;
            }
            state = Object.assign({}, state, { quotes: quotes});
            return state;

        case DELETE_QUOTE:
            var quotes =  cloneObject(state.quotes) //clone the current state
            var index = getIndex(quotes, action.id); //find the index of the quote with the id passed
            if(index !== -1) quotes.splice(index, 1);//if yes, undo, remove the QUOTE
            state = Object.assign({}, state, { quotes: quotes});
            return state;

        default:
            return state;
    }
};


function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
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