import React, {useContext} from 'react'
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  // const context =useContext(GlobalContext)
  // console.log(context)
  //use instead following if you want using destructuring
  const {transaction} =useContext(GlobalContext)

  // Bear in mind transaction is an array and we need to loop/map through it to print. 
  // and output each component.
  // We need to change the original simple placeholder codes for getComputedStyle.
  return (
    <>
    <h3>History</h3>
<<<<<<< HEAD
    <ul id="list" className="list">
      {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
      
        {/* <li className="minus">
=======
    <ul id="lists" className="lists">
        <li className="minus">
>>>>>>> a309653d52e70ecacdc5922f46853a21bafb331d
            Cash<span>-$400</span><button className="delete-btn">x</button>
        </li> */}
    </ul> 
    </>
  )
}
