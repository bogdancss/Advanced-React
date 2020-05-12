import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Item from './Item'

const Wrapper = styled.div`
  text-align: center;
`
const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

export default class Items extends Component {
  render() {
    return (
      <Wrapper>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>Error: {error.message}</p>
            }
            return (
              <List>
                {data.items.map(item => (
                  <Item key={item.id} item={item}/>
                ))}
              </List>
            )
          }}
        </Query>
      </Wrapper>
    )
  }
}
