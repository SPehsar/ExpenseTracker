import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

// Initial state


// create context
export const GlobalContext = createContext(initialState);

// provider component - GlobalProvider ia parrents and we use it in App.js to wrap other componenets inside it to inherite intialstate 
export const GlobalProvider = ({children}) => { //we put only children of props by destructuring which are those <blah/> under app.js
    const [state, dispatch] = useReducer(AppReducer, initialState);// we use dispatch to call reducer action
    // AppReducer is the place that reducer is 

    // state.transactions provide anything within initialState object
    return (<GlobalContext.Provider value={{transactions: state.transactions}}>
        {children}
        </GlobalContext.Provider>) // "provider" provides all the transaction part to the children

}