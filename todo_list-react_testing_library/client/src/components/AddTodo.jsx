import React, {useState} from 'react';

var AddTodo = (props) => {
  const postTodo = (e) => {
    e.preventDefault();
    var todo = {
      todo: props.newTodo,
      completed: false
    }
    props.addTodos(todo);
    e.target.reset()
  }

  return (
    <form id='form' onSubmit={postTodo} >
      <label>Todo
        <input onChange={(e) => props.setNewTodo(e.target.value)}></input>
      </label>
      <button type='submit'>Add Todo</button>
    </form>
  )
}

export default AddTodo