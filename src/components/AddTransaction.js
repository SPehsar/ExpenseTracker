import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  

  const{addTransaction} =useContext(GlobalContext);

  const onSubmit =  e => {
    e.preventDefault();

    const newTransaction = {
      // create a random id
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount  // poarse to a number lets try + method instead of parseInt
    } 

    addTransaction(newTransaction);

  }
  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input type="number"  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <div>
          <button className="btn">Add transaction</button>
        </div>
      </form>
    </>
  );
};
