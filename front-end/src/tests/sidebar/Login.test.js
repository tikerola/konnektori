import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Login } from '../../components/Sidebar/Login'

test('renders component', () => {

  const toggleRegister = jest.fn()
  const component = render(<Login toggleRegister={toggleRegister} />)

  expect(component.container).toHaveTextContent('Login')

  const register = component.getByText('Register here')
  fireEvent.click(register)

  expect(toggleRegister.mock.calls.length).toBe(1)
  

})

test('dispatch login if username and pasword have values', () => {

  const login = jest.fn()
  const setNotification = jest.fn()
  
  const component = render(<Login login={login} setNotification={setNotification} />)

  const input1 = component.container.querySelector('#login-username')
  fireEvent.change(input1, {target: { value: 'timo' }})
  
  const input2 = component.container.querySelector('#password')
  fireEvent.change(input2, {target: { value: '123456' }})

  const loginButton = component.container.querySelector('#login')
  fireEvent.click(loginButton)

  expect(login.mock.calls.length).toBe(1)
  
})

test('dispatch setNotification if username or pasword dont have values', () => {

  const login = jest.fn()
  const setNotification = jest.fn()
  
  const component = render(<Login login={login} setNotification={setNotification} />)

  const input1 = component.container.querySelector('#login-username')
  fireEvent.change(input1, {target: { value: '' }})
  
  const input2 = component.container.querySelector('#password')
  fireEvent.change(input2, {target: { value: '123456' }})

  const loginButton = component.container.querySelector('#login')
  fireEvent.click(loginButton)

  expect(login.mock.calls.length).toBe(0)
  expect(setNotification.mock.calls.length).toBe(1)
  
})