import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import React, {useContext} from 'react'
import { GlobalContext } from "../context/GlobalState";
 
function trans(){
  // const income = amounts
  // .filter(item => item > 0)
  // .reduce((acc, item) => (acc += item), 0)
  // .toFixed(2);

  // const expense =
  // (amounts.filter(item => item <0)
  // .reduce((acc, item) => (acc += item), 0) * -1)
  // .toFixed(2);

 }

export const IncomeExpenses = () => {
  const {transactions} =useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
  .filter(item => item > 0)
  .reduce((acc, item) => (acc += item), 0)
  .toFixed(2);

  const expense =
  (amounts.filter(item => item <0)
  .reduce((acc, item) => (acc += item), 0) * -1)
  .toFixed(2);
  

  return (
    
    <div className="inc-exp-containers">
        <div>
            <h4>Income</h4>
<<<<<<< HEAD
            <p  className="money plus">{income}</p>
=======
            <p  className="money pius">-$0.0</p>
>>>>>>> a309653d52e70ecacdc5922f46853a21bafb331d
        </div>
        <div>
            <h4>Expense</h4>
            <p i class="money minus">{expense}</p>
        </div>
    </div>
  )
}
