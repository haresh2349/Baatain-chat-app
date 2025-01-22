import { FiLoader } from 'react-icons/fi'
import React from 'react'
import Styles from './spinnner.module.css'
export const Spinner = () => {
  return (
    <div className={Styles.spinnerWrapper}>
      <FiLoader color="red" size={'25px'} />
    </div>
  )
}
