/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 6/29/2017
 * Project: React Native Redux Quotes App with CRUD operations
 */

'use strict';

export const QUOTES_AVAILABLE = 'QUOTES_AVAILABLE';
export const ADD_QUOTE = 'ADD_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';

var { AsyncStorage } = require('react-native');


// Add Quote - CREATE (C)
export function addQuote(quote){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);
                quotes.unshift(quote); //add the new quote to the top
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: ADD_QUOTE, quote:quote});
                });
            }
        });
    };
}

// Get Data - READ (R)
export function getQuotes(){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
                if (quotes !== null){
                dispatch({type: QUOTES_AVAILABLE, quotes:JSON.parse(quotes)});
            }
        });
    };
}

// Update Quote - UPDATE (U)
export function updateQuote(quote){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);
                var index = getIndex(quotes, quote.id); //find the index of the quote with the id passed
                if (index !== -1) {
                    quotes[index]['author'] = quote.author;
                    quotes[index]['quote'] = quote.quote;
                }
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: UPDATE_QUOTE, quote:quote});
                });
            }
        });
    };
}

// Delete Quote - DELETE (D)
export function deleteQuote(id){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);

                var index = getIndex(quotes, id); //find the index of the quote with the id passed
                if(index !== -1) quotes.splice(index, 1);//if yes, undo, remove the QUOTE
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: DELETE_QUOTE, id:id});
                });
            }
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// The action, a basic function called from the component
// whenever we want the whole state of the app to be changed
//Our action creator is a simple function returning an object (the action itself)
// with a type attribute expressing what happened with the app.