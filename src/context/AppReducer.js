// Reducer basically application state changes due to changes of state and contaxt changes.

// this function takes state and sort of action, such as delete, add, ..
// type is the id for that action
// switch is based on type that is ID for like add transaction, delete transaction
export default (state, action) => { 
    switch(){
    case 'DELETE_TRANSACTION':
        return {  // in reality we can change it; but we create a new one and send it down
            ...state, // sends current state
            transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
        }

    case 'ADD_TRANSACTION':
        return {  // in reality we can change it; but we create a new one and send it down
            ...state, // sends current state
            transactions: [action.payload, ...state.transactions] // sends all current transaction plus what we change here
            }
    default:
        return state; // return state as is
}
}

