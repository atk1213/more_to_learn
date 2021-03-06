// import React from 'react';

// const Details = (props) => {
//   // return <h1>hi lol</h1>
// return <pre><code>{JSON.stringify(props, null, 4)}</code></pre>
// }

// export default Details;

import React from 'react';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import { navigate } from '@reach/router';
import Modal from './Modal.js';

class Details extends React.Component {
  // constructor(props){
  //   // call the constructor on the parent class which is React.Component
  //   super(props);
  //   this.state = {
  //     loading: true
  //   }
  // }
  
  //must modify babel config to make this work
  state = { loading: true, showModal: false };

  // lifecycle methods - like useEffect
    // im going to do this once when i'm created, and then i'm done
  // it's important to use an arrow function here to bind keyword this
  componentDidMount(){
    // throw new Error('this is what would happen if there was an error')
      // ^ this error wouldn't be caught if only the return statement in this component was wrapped with ErrorBoundary
    pet.animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        })
      }, console.error)
  }
  toggleModal = () => this.setState({showModal: !this.state.showModal});
  adopt = () => navigate(this.state.url);
  render() {
    if (this.state.loading){
      return <h1>loading...</h1>
    }
    const {animal, breed, location, description, name, media, showModal} = this.state;
    return (
      <div className='details'>
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {/* {(themeHook) => (
              <button style={{backgroundColor: themeHook[0]}}>
                Adopt {name}
              </button>
            )} */}
            {([theme]) => (
              <button onClick={this.toggleModal} style={{backgroundColor: theme}}>
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          {/* <button>Adopt {name}</button> */}
          <p>{description}</p>
          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className='buttons'>
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No, I'm a monster</button>
                  </div>
                </div>
              </Modal>
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default function DetailsWithErrorBoundaries(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
};