import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const GET_PETS = gql`
  query GetPets{
    pets{
      name
      id
      type
      img
    }
  }
`

const ADD_PET = gql`
  mutation CreateAPet ($newPet: NewPetInput!) {
    addPet (input: $newPet){
        name
        id
        type
        img
    }  
  }
`

export default function Pets () {
  const [modal, setModal] = useState(false)
  // useState will return an array
    // 1st item in array is state we are keeping track of (modal)
    // 2nd item in array is function used to update state (setModal)
  const {data, loading, error} = useQuery(GET_PETS);
  // returns an object with data, loading, and error

  // const [addPet, {data, loading, error}] = useMutation(ADD_PET)
  // const [addPet, newPet] = useMutation(ADD_PET)
  // 1st item is the query function
  // second item is an object with data, loading, and error

  const [addPet, newPet] = useMutation(
    ADD_PET,
    {
      update(cache, { data: { addPet } }) {
        const { pets } = cache.readQuery({ query: GET_PETS });
        cache.writeQuery({
          query: GET_PETS,
          // data: { pets: pets.concat([addPet]) }
          data: {pets: [addPet, ...pets]}
        })
      }
    }
    )

  
  const onSubmit = input => {
    setModal(false)
    // input = type and name
    addPet({
      variables: {
        newPet: input
      }
    })

  }
  
  if (loading || newPet.loading) {return <Loader />}
  if (error || newPet.error) {console.error(error)}

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}
