import React from 'react';
import App from './App.jsx';
import AddTodo from './AddTodo.jsx';
import { render, fireEvent, screen, createEvent } from '@testing-library/react';

test ('actually renders', () => {
  // const {getByLabelText} = render(<App />);
  // expect(getByLabelText('Todo')).toBeTruthy()
  render(<App />);
  expect(screen.getByLabelText('Todo')).toBeTruthy()
})

describe('input works as expected', () => {
  test('registers input change', () => {
    const {getByLabelText} = render(<App />);
    var node = getByLabelText('Todo');
    fireEvent.change(node, {target: {value: 'test string'}});
    expect(node.value).toBe('test string')
  });
  test('input change triggers state change', () => {

  })
});

describe('submit works as expected', () => {
  test('adds new todo onSubmit', () => {
    // const {getByLabelText, getByText} = render(<App />);
    // var input = getByLabelText('Todo');
    // var button = getByText('Add Todo');
    // fireEvent.change(input, {target: {value: 'get test to pass'}});
    // fireEvent.click(button);
    // var newChild = getByText('get test to pass');
    // console.log(newChild);
    // expect(newChild).toBeTruthy()
    const onSubmit = jest.fn();
    render(<App />);
    var button = screen.getByText('Add Todo');
    fireEvent.click(button, onSubmit);
    console.log(button)
    expect(onSubmit).toHaveBeenCalled()
  });
});