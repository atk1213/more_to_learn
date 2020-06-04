import React, { useState } from 'react';
import { db } from '../config';
import firebase from 'firebase';

var ListElement = (props) => {
  // comment out lines 8-29 to use update
  // uncomment lines 10-12 to use delete

  // const [clicked, toggleClicked] = useState(false);
  // const [updatedTodoState, updateTodoState] = useState('');

  // const updateTodo = (todoId, e) => {
  //   e.preventDefault();
  //   db.ref(`/todos/${todoId}`).update({todo: updatedTodoState});
  //   toggleClicked(false)
  // }

  // if (clicked) {
  //   return (
  //     <form onSubmit={(e) => {updateTodo(props.todo.id, e)}}>
  //       <input placeholder={props.todo.todo} onChange={(e) => updateTodoState(e.target.value)} ></input>
  //     </form>
  //   )
  // } else {
  //   return (
  //     <div onClick={() => {toggleClicked(true)}}>
  //       {props.todo.todo}
  //     </div>
  //   )
  // }

  const removeTodo = (todoId) => {
    db.ref(`/todos/${todoId}`).remove()
  }

  return (
    <div onClick={() => {removeTodo(props.todo.id)}}>
      {props.todo.todo}
    </div>
  )
}

export default ListElement