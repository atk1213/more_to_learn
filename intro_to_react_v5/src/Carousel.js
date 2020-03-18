import React from 'react';

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  // special react method = takes in a set of props and returns a new set of state
  static getDerivedStateFromProps({ media }) {
    let photos = ['http://placecorgi.com/600/600'];
    if (media.length){
      photos = media.map(({large}) => large)
    }

    return { photos }
  }

  // arrow function to bind
  // "dataset.index" = string (anything that comes directly from the dom is a string)
    // unary + symbol will turn it into a number
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index
    })
  }

  render(){
    const {photos, active} = this.state;
    return (
      <div className='carousel'>
        <img src={photos[active]} alt='animal' />
        <div className='carousel-smaller'>
          {photos.map((photo, index) => (
            <img
              key = {photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
              alt='animal thumbnail'
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel