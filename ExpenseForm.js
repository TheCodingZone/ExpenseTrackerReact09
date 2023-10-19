
    

import React, { useEffect, useRef, useState } from 'react';
import './ExpenseForm.css';
import axios from 'axios';

const ExpenseForm = () => {
  const expenseAmountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categorySelectRef = useRef();
  const [userData, setUserData] = useState([]);

  const deleteData = (id) => {
    axios.delete(`https://expense-tracker-c90d2-default-rtdb.firebaseio.com/ExpenseRecords/${id}.json`)
      .then(() => {
        const updatedData = userData.filter(entry => entry.id !== id);
        setUserData(updatedData);
      })
      .catch(error => {
        console.log('Error deleting data: ' + error.message);
      });
  };

  const expenseSubmitHandler = (event) => {
    event.preventDefault();
    const enteredExpenseAmount = expenseAmountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categorySelectRef.current.value;

    const newEntry = {
      expenseamount: enteredExpenseAmount,
      description: enteredDescription,
      category: enteredCategory,
    };

    axios.post('https://expense-tracker-c90d2-default-rtdb.firebaseio.com/ExpenseRecords.json', newEntry)
      .then(response => {
        newEntry.id = response.data.name;
        setUserData(prevData => [...prevData, newEntry]);
      })
      .catch(error => {
        console.log('Error posting data: ' + error.message);
      });

    expenseAmountInputRef.current.value = '';
    descriptionInputRef.current.value = '';
    categorySelectRef.current.value = '';
  };

  useEffect(() => {
    axios.get('https://expense-tracker-c90d2-default-rtdb.firebaseio.com/ExpenseRecords.json')
      .then(response => {
        if (response.data) {
          console.log(response.data);
          const data = Object.keys(response.data).map(id => ({
            id,
            ...response.data[id],
          }));
          setUserData(data);
        }
      })
      .catch(error => {
        console.log('Error fetching data: ' + error.message);
      });
  }, []);

  return (
    <div>

    <form className='expenseform'>
        <h4>ADD YOUR EXPENSE</h4>
      <label htmlFor="expenseAmount">Expense Amount</label>
      <input type="digit" ref={expenseAmountInputRef}/>
      <label htmlFor="description">Description</label>
      <input type="text" ref={descriptionInputRef}/>
     
      <label for="cars">Category</label>

<select name="category" id="category" className='input' ref={categorySelectRef}>
  <option value="Food">Food</option>
  <option value="Petrol">Petrol</option>
  <option value="Travelling">Travelling</option>
  <option value="Other">Salary</option>
</select>
<br />
<button className='submitbutton' onClick={expenseSubmitHandler}>Submit</button>
    </form>
   
  <table className='table mt-4'>
  <thead class="thead-light">
    <tr>
      <th scope="col"></th>
      <th scope="col">Expense Amount</th>
      <th scope="col">Description</th>
      <th scope="col">Quantity</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {userData && userData.map((entry, index) => (
          <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{entry.expenseamount}</td>
          <td>{entry.description}</td>
          <td>{entry.category}</td>
          <td><button className='deletebutton' onClick={()=>deleteData(entry.id)}>Delete</button></td>
        </tr>
    ))
    }
  </tbody>
  </table>
</div>
  )
}

export default ExpenseForm
