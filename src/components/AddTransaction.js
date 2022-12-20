import React, { useState } from "react";

export const AddTransaction = () => {
  const [text, setText] = useState({null});
  
  return (
    <>
      <h3>Add new transaction</h3>
      <form>
        
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(err.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input type="number"  value={amount} onChange={(e) => setAmount(err.target.value)} placeholder="Enter amount..." />
        </div>
        <div>
          <button className="btn">Add transaction</button>
        </div>
      </form>
    </>
  );
};
