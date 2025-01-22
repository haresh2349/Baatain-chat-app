import React, { useState } from 'react'
import { useTheme } from '../../../contexts/ThemeContext'
import { Input } from '../../../components/Elements/Input/Input'
import Styles from './login.module.css'
import {
  LoginResponseDataType,
  handleLoginErrors,
  handleLoginUser,
  validateInputField,
} from './login-manager'
import { useAuth } from '../../../contexts/auth-context'
import { Spinner } from '../../../components/Elements/spinner/spinner'

interface LoginProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export type LoginUserType = {
  email: string | null
  password: string | null
}

const Login: React.FC<LoginProps> = ({ setShowLogin }) => {
  const { theme } = useTheme()
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginUserType>({} as LoginUserType)
  const [errors, setErrors] = useState<LoginUserType>({} as LoginUserType)
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (props: { name: string; inputValue: string }) => {
    const { name, inputValue } = props
    setFormData((prev) => {
      return { ...prev, [name]: inputValue }
    })
  }

  const handleLogin = () => {
    if (handleLoginErrors({ formData, setErrors })) return
    const next = (data: LoginResponseDataType) => {
      login()
      localStorage.setItem('accessToken', JSON.stringify(data?.token))
    }
    handleLoginUser({ payload: formData, setIsLoading, next })
  }

  return (
    <div className={Styles.login_wrapper}>
      <div className={`${Styles.container} ${Styles[theme]}`}>
        <header className={Styles.header}>Sign In</header>
        <div className={Styles.fields_wrapper}>
          <Input
            isRequired
            type="email"
            label="Email"
            placeholder="Enter email"
            name="email"
            errorMessage={errors?.email}
            onChange={handleChange}
          />
          <Input
            isRequired
            type="password"
            label="Password"
            placeholder="Enter password"
            name="password"
            errorMessage={errors?.password}
            onChange={handleChange}
          />
          <div className={Styles.btn_wrapper}>
            <button onClick={handleLogin}>
              {isLoading ? <Spinner /> : 'SIGN IN'}
            </button>
          </div>
          <p className={Styles.l_p}>
            Don't have an account ?{' '}
            <span onClick={() => setShowLogin((prev) => !prev)}>Signup</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
