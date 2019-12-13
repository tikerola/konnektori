import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import LoginAndSignup from '../../components/Sidebar/LoginAndSignup'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureMockStore()
const store = mockStore({})

test('renders login and signup pages', () => {

  const component = render(<Provider store={store}><LoginAndSignup /></Provider>)

  expect(component.container).toHaveTextContent('Login')

  const register = component.getByText('Register here')
  fireEvent.click(register)

  expect(component.container).toHaveTextContent('Sign Up')
  expect(component.container).toHaveTextContent('Have already an account?')

  const login = component.getByText('Login here')
  fireEvent.click(login)
  
  expect(component.container).toHaveTextContent('Don\'t have an account yet?')
})

