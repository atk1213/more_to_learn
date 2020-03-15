import React from 'react';
import { render } from 'react-dom';
import Pet from './Pet';
import { Router, Link } from '@reach/router';
import SearchParams from './SearchParams';
import Details from './Details';

const App = () => {
  // return React.createElement(
  //   "div",
  //   {},
  //   [
  //     React.createElement("h1", {}, "Adopt Me!"),
  //     React.createElement(Pet, {name: "Luna", animal: "dog", breed: "Havanese"}),
  //     React.createElement(Pet, {name: "Pepper", animal: "bird", breed: "Cockatiel"}),
  //     React.createElement(Pet, {name: "Doink", animal: "cat", breed: "Mixed"})
  //   ]
  // )
  return (
    <React.StrictMode>
      <div>
        <header>
          {/* Link changes to an <a> but reach router will handle the various routing mechanisms for you */}
          <Link to='/'>Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path='/' />
          {/* <Pet name='Luna' animal='dog' breed='Havanese' />
          <Pet name='Pepper' animal='bird' breed='Cockatiel' />
          <Pet name='Doink' animal='cat' breed='Mixed' /> */}
          <Details path='/details/:id' />
        </Router>
      </div>
    </React.StrictMode>
  )
} 
render(<App />, document.getElementById("root"))