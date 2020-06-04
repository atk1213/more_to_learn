import React from 'react';

var ListElement = (props) => {
  return (
    <div>
      {props.todo.todo}
    </div>
  )
}

export default ListElement