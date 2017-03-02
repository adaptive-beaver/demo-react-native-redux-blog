/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 2/3/2017
 * Project: React Native Redux Boilerplate
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../app/reducers/index'; //Import the reducer

// Connect our store to the reducers
export default createStore(reducers, applyMiddleware(thunk));


//Redux
// Redux is a state container for JavaScript apps, often called a Redux store.
//It stores the whole state of the app in an immutable object tree.

//To create a store the
// createStore(reducer, [initialState], [enhancer]) function is used to create a new store.
// It takes three arguments:
//
//reducer - A reducing function. We will describe it below.
//initialState - The initial state of the store.
//enhancer - Can be used to enhance the Redux store and add third-party libraries and middleware for logging, persistant storage, etc.

// The Redux store API is tiny and has only four methods:
// store.getState() - Returns the current state object tree.
// store.dispatch(action) - Dispatch an action to change the state.
// store.subscribe(listener) - Listen to changes in the state tree.
// store.replaceReducer(nextReducer) - Replaces the current reducer with another.
// This method is used in advanced use cases such as code splitting.

// The state can only be changed by emitting an action.
// The state tree is never mutated directly instead you use pure functions called reducers.