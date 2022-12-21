import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

// Initial state
const initialState = {
    transactions: [
    ]
}

// create context
export const GlobalContext = createContext(initialState);

// provider component - GlobalProvider ia parrents and we use it in App.js to wrap other componenets inside it to inherite intialstate 
export const GlobalProvider = ({}) => { //we put only children of props by destructuring which are those <blah/> under app.js
    const [state, dispatch] = useReducer(AppReducer, initialState);// we use dispatch to call reducer action
    // AppReducer is the place that reducer is 

     // Action for deleting income/expense and immediately correct the totals
    function deleteTransaction(id){
        dispatch({type: 'DELETE_TRANSACTION',
        payload: id,
    });
    }

    // Action for adding income/expense and immediately correct the totals
    function addTransaction(transaction){
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction,
    });
    }

    // state.transactions provide anything within initialState object
    return (<GlobalContext.Provider value={{transactions: state.transactions,
            addTransaction,  // we use provide to pass this
            deleteTransaction // we use provide to pass this
    }}>
        {children}
        </GlobalContext.Provider>) // "provider" provides all the transaction part to the children

}