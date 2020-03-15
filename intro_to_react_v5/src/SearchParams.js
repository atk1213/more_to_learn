import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';

const SearchParams = () => {
  const [ location, setLocation ] = useState("San Francisco, CA");
  const [ breeds, setBreeds ] = useState([]);
  // const [ animal, setAnimal ] = useState("dog");
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  // const [ breed, setBreed ] = useState({});
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);

  // returns a promise
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed, 
      type: animal
    })

    setPets(animals || []);
  }

  useEffect(()=> {
    setBreeds([]);
    setBreed('');
    pet.breeds(animal).then(({breeds}) => {
      const breedStr = breeds.map(({ name }) => name)
      // const breedStr = breeds.map((breedObj) => breedObj.name)
      setBreeds(breedStr)
    }, console.error)
  }, [animal, setBreed, setBreeds])

  return (
    <div className='search-params'>
      <h1>Search {location} for {animal}s</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets()
      }}>
        <label htmlFor='location'>
          Location
          <input 
            id='location' 
            value={location} 
            placeholder='location' 
            onChange={e => setLocation(e.target.value)}
            onBlur={() => console.log('focus!!')}></input>
        </label>
        {/* <label htmlFor='animal'>
          Animal
          <select
            id='animal'
            value={animal}
            onChange={e => setAnimal(e.target.value)}
            onBlur={e => setAnimal(e.target.value)}>
            <option>All</option>
            {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
          </select>
        </label>
        <label htmlFor='breed'>
          Breed
          <select
            id='breed'
            value={breed}
            onChange={e => setBreed(e.target.value)}
            onBlur={e => setBreed(e.target.value)}
            disabled={breeds.length === 0}>
            <option>All</option>
            {breeds.map(breedStr => <option key={breedStr} value={breedStr}>{breedStr}</option>)}
          </select>
        </label> */}
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams