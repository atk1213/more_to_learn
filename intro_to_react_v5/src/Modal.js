import React, { useEffect, useRef } from 'react';
import Portal, { createPortal } from 'react-dom';


const Modal = ({children}) => {
  const elRef = useRef(null);
  if (!elRef.current){
    const div = document.createElement('div')
    elRef.current = div;
  }
  
  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elRef.current)

    // useEffect's return keyword with a function is the cleanup function
    return () => modalRoot.removeChild(elRef.current)
  }, [])

  return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;