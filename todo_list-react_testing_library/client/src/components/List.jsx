import React, { useEffect } from 'react';
import ListElement from './ListElement';

var List = (props) => {
  
  useEffect(() =>{
    
  }
  )

  return (
    <div>
      {props.todos.map((todo, index) => {
        return <ListElement todo={todo} key={index} />
      })}
    </div>
  )
}

export default List