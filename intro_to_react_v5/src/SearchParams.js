import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
  const [ location, setLocation ] = useState("San Francisco, CA");
  const [ breeds, setBreeds ] = useState([]);
  // const [ animal, setAnimal ] = useState("dog");
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  // const [ breed, setBreed ] = useState({});
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext)

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
        <label htmlFor='theme'>
          Theme
            <select value={theme} 
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}>
              <option value='peru'>Peru</option>
              <option value='darkblue'>Dark Blue</option>
              <option value='mediumorchid'>Medium Orchid</option>
              <option value='cartreuse'>Chartreuse</option>
            </select>
        </label>
        <button style={{backgroundColor: theme}}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams