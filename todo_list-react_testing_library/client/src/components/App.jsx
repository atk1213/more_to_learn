import React, {useState, useEffect} from 'react';
import AddTodo from './AddTodo';
import List from './List';
import { db } from '../config';
import firebase from 'firebase';

const addTodos = (todo) => {
  db.ref('/todos').push(todo)
}

let dbRef = db.ref(`/todos`)

var App = () => {
  const [currentTodos, setCurrentTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    dbRef.on('value', snapshot => {
      let data = snapshot.val();
      if (data == null){
        setCurrentTodos([{todo: "add a todo!", completed: false}])
      } else {
        let items = Object.values(data);
        let key = Object.keys(data);
        for (let i = 0; i < items.length; i++) {
          items[i]["id"] = key[i];
        }
        setCurrentTodos(items);
      }
    })
  }, [newTodo])

  return (
    <div>
      <AddTodo addTodos={addTodos} newTodo={newTodo} setNewTodo={setNewTodo} />
      <List todos={currentTodos} />
    </div>
  )
}

export default App