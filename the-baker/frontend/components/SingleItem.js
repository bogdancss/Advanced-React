import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Head from 'next/head'
import ErrorMessage from './ErrorMessage'

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`

const SingleItem = props => (
  <Query query={SINGLE_ITEM_QUERY} variables={{ id: props.id }}>
    {({ error, loading, data }) => {
      if (error) return <ErrorMessage error={error}/>
      if (loading) return <p>Loading...</p>
      if (!data.item) return <p>No item found for {props.id}</p>
      return (
        <SingleItemStyles>
          <Head>
            <title>The Baker | {data.item.title}</title>
          </Head>
          <img src={data.item.largeImage} alt={data.item.title}/>
          <div className='details'>
            <h2>{data.item.title}</h2>
            <p>{data.item.description}</p>
          </div>
        </SingleItemStyles>
      )
    }}
  </Query>
)

export default SingleItem
