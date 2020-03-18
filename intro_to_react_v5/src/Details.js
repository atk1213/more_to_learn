// import React from 'react';

// const Details = (props) => {
//   // return <h1>hi lol</h1>
// return <pre><code>{JSON.stringify(props, null, 4)}</code></pre>
// }

// export default Details;

import React from 'react';
import pet from '@frontendmasters/pet';

class Details extends React.Component {
  // constructor(props){
  //   // call the constructor on the parent class which is React.Component
  //   super(props);
  //   this.state = {
  //     loading: true
  //   }
  // }
  
  //must modify babel config to make this work
  state = { loading: true };

  // lifecycle methods - like useEffect
    // im going to do this once when i'm created, and then i'm done
  // it's important to use an arrow function here to bind keyword this
  componentDidMount(){
    pet.animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
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
  render() {
    if (this.state.loading){
      return <h1>loading...</h1>
    }
    const {animal, breed, location, description, name} = this.state;
    return (
      <div className='details'>
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}

export default Details;