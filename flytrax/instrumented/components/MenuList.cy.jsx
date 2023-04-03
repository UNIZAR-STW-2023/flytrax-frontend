import React from 'react'
import MenuList from './MenuList'

describe('<MenuList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MenuList />)
  })
})