import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    name
    id
    type
    img
    vaccinated @client
    owner {
      id
      age @client
    }
  }
`

// const GET_PETS = gql`
//   query GetPets{
//     pets{
//       name
//       id
//       type
//       img
//       owner {
//         id
//         age @client
//       }
//     }
//   }
// `

const GET_PETS = gql`
  query GetPets{
    pets{
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`

// const ADD_PET = gql`
//   mutation CreateAPet ($newPet: NewPetInput!) {
//     addPet (input: $newPet){
//         // name
//         // id
//         // type
//         // img
//         // owner {
//         //   id
//         //   age @client
//         // }
//     }  
//   }
// `

const ADD_PET = gql`
  mutation CreateAPet ($newPet: NewPetInput!) {
    addPet (input: $newPet){
      ...PetsFields
    }  
  }
  ${PETS_FIELDS}
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
      },
      // optimisticResponse: {}
    }
  )

  const onSubmit = input => {
    setModal(false)
    // input = type and name
    addPet({
      variables: {
        newPet: input,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addPet: {
          id: Math.floor(Math.random() * 100) + '',
          __typename: 'Pet',
          name: input.name,
          type: input.type,
          img: 'https://pawsonthehill.com/wp-content/uploads/2018/03/5166-Pets.png'
        }
      }
    })
  }
  
  // if (loading || newPet.loading) {return <Loader />}
  if (loading) {return <Loader />}
  if (error || newPet.error) {console.error(error)}

  console.log(data.pets[0])

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
