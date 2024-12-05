import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext"
import { Input } from "../../../components/Elements/Input/Input"
import Styles from "./signup.module.css"
import {handleErrors, handleRegisterUser, handleValidate } from "./signup-manager";
import { handleCheckUniquenessOfEmail } from "../auth-common-managers";

export type SingupUserType = {
    userName: string | null
    email: string | null
    password: string | null
    confirmPassword?:string | null
}

interface SignupProps {
    setShowLogin : React.Dispatch<React.SetStateAction<boolean>>
}

const Signup : React.FC<SignupProps> = ({setShowLogin}) => {
    const {theme} = useTheme();
    const [formData,setFormData] = useState<SingupUserType>({} as SingupUserType);
    const [errors,setErrors] = useState<SingupUserType>({} as SingupUserType);
    const [isLoading,setIsLoading] = useState(false);

    const handleChange = (props:{name:string,inputValue:string}) => {
        const {name,inputValue} = props;
        setFormData(prev => {   
            return {...prev,[name]:inputValue}
        })  
    }


    const handleSignup = () => {
        if(handleErrors({formData,setErrors})) return 
        const next = () => {

            setShowLogin(true)
        }
        handleRegisterUser({payload:formData,setIsLoading,next})
    }
    console.log(errors,"errors")
    return <div className={Styles.signup_wrapper}>
        <div className={`${Styles.container} ${Styles[theme]}`}>
            <header className={Styles.header}>Sign Up</header >
            <div className={Styles.fields_wrapper}>
                <Input isRequired={true} label="User Name" placeholder="Enter userName" name="userName" errorMessage={errors?.userName} onChange={handleChange}/>
                <Input isRequired={true} type="email" label="Email" placeholder="Enter email" name="email" errorMessage={errors?.email} onChange={handleChange} onBlur={({name,inputValue}) => handleCheckUniquenessOfEmail()} validate={(e) => handleValidate({e,formData})} />
                <Input isRequired={true} type="password" label="Password" placeholder="Enter new password" name="password" errorMessage={errors?.password} onChange={handleChange}/>
                <Input type="password" label="Confirm Password" placeholder="Enter new password" name="confirmPassword" errorMessage={errors?.confirmPassword} onChange={handleChange} validate={(e) => handleValidate({e,formData})}/>
                <div className={Styles.btn_wrapper}>
                    <button onClick={handleSignup}>SIGN UP</button>
                </div>
                <span className={Styles.s_p}>Already have an account ? <span onClick={() => setShowLogin(true)}>Sign In</span></span>
            </div>
        </div>
    </div>
}

export default Signup