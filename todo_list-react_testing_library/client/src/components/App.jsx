import React from 'react';
import AddTodo from './AddTodo';
import List from './List';

var App = (props) => {
  console.log(props.todos)
  return (
    <div>
      <AddTodo />
      <List todos={props.todos} />
    </div>
  )
}

export default App