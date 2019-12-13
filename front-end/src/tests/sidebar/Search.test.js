import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Search } from '../../components/Sidebar/Search'
import { prettyDOM } from '@testing-library/dom'

afterEach(cleanup)

test('renders component', () => {

  const component = render(<Search />)
  expect(component.container).toHaveTextContent('Age range')

})

test('fires search profiles after button click', () => {
  const searchProfiles = jest.fn()
  const history = {
    push: jest.fn()
  }

  const component = render(<Search searchProfiles={searchProfiles} history={history} />)

  const searchButton1 = component.container.querySelector('Button')
  fireEvent.click(searchButton1)

  expect(searchProfiles.mock.calls.length).toBe(1)

  const genderSwitch = component.container.querySelector('#gender')
  fireEvent.change(genderSwitch, { target: { value: false } })

  fireEvent.click(searchButton1)

  expect(searchProfiles.mock.calls.length).toBe(2)
  
})

test('search profile by username', () => {
  const searchProfile = jest.fn()
  
  const component = render(<Search searchProfile={searchProfile} />)

  const searchButton2 = component.container.querySelector('Button:nth-child(2)')
  fireEvent.click(searchButton2)

  expect(searchProfile.mock.calls.length).toBe(1)

})