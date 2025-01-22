import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Login from '../modules/auth/login/Login'
import { ThemeProvider } from '../contexts/ThemeContext'
import { AuthProvider } from '../contexts/auth-context'
import {
  handleLoginUser,
  handleLoginErrors,
} from '../modules/auth/login/login-manager'
import axios from 'axios'
jest.mock('axios')

describe('test login component', () => {
  it('Should load login component', () => {
    const mockSetShowLogin = jest.fn()
    const { getByText } = render(
      <ThemeProvider>
        <AuthProvider>
          <Login setShowLogin={mockSetShowLogin} />
        </AuthProvider>
      </ThemeProvider>
    )
    expect(getByText('SIGN IN')).toBeInTheDocument()
  })

  it('should load input with email and password', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <Login setShowLogin={jest.fn()} />
        </AuthProvider>
      </ThemeProvider>
    )

    const inputWithEmail = screen.getByPlaceholderText('Enter email')
    const inputWithPassword = screen.getByPlaceholderText('Enter password')

    expect(inputWithEmail).toBeInTheDocument()
    expect(inputWithPassword).toBeInTheDocument()
  })

  it('Should load 2 input boxes in the login component', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <Login setShowLogin={jest.fn()} />
        </AuthProvider>
      </ThemeProvider>
    )

    const inputBoxes = screen.getAllByRole('textbox')
    expect(inputBoxes.length).toBe(2)
  })

  it('Should not allow login with empty fields', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <Login setShowLogin={jest.fn()} />
        </AuthProvider>
      </ThemeProvider>
    )

    const signInButton = screen.getByRole('button')
    fireEvent.click(signInButton)

    const emailError = screen.getByText('email is required!')
    const passwordError = screen.getByText('password is required!')
    expect(emailError).toBeInTheDocument()
    expect(passwordError).toBeInTheDocument()
  })

  it('Should not allow login with invalid email', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <Login setShowLogin={jest.fn()} />
        </AuthProvider>
      </ThemeProvider>
    )

    const inputWithEmail = screen.getByPlaceholderText('Enter email')
    const signInButton = screen.getByRole('button')

    fireEvent.change(inputWithEmail, { target: { value: 'invalidEmail' } })
    fireEvent.click(signInButton)
    const inValidEmailError = screen.getByText(/Enter valid email!/i)
    expect(inValidEmailError).toBeInTheDocument()
  })
})

describe('Test Login API call', () => {
  // beforeEach(() => {
  //   mockedAxios.get.mockResolvedValue(() => Promise.resolve({data:{token:"access-token"}}))
  // })

  it('Should store token into local storage on successfull login', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <Login setShowLogin={jest.fn()} />
        </AuthProvider>
      </ThemeProvider>
    )

    const inputWithEmail = screen.getByPlaceholderText('Enter email')
    const inputWithPassword = screen.getByPlaceholderText('Enter password')
    const signInButton = screen.getByRole('button', { name: 'SIGN IN' })
    fireEvent.click(signInButton)

    expect(axios.post).toHaveBeenCalledWith({
      email: 'johndoe@gmail.com',
      password: 'test',
    })
  })
})
