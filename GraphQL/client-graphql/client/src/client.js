import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */



// "hey apollo client, our api is here!" - linking our server to apollo client
// const link = new HttpLink({uri: 'https://rickandmortyapi.com/graphql'})
const http = new HttpLink({uri: 'http://localhost:4000/'})
const delay = setContext(
  request => 
    new Promise((success, fail) => {
      setTimeout(() => {
        success()
      }, 800)
    })
)
const link = ApolloLink.from([
  delay,
  http
])
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
})

// const query = gql`
// {
//   characters {
//     results {
//       name
//     }
//   }
// }
// `

// client.query({query})
//   .then(result => console.log(result))

export default client