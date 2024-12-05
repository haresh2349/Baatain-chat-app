import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext"
import { Input } from "../../../components/Elements/Input/Input"
import Styles from "./login.module.css"
import { validateInputField } from "./login-manager";

interface LoginProps {
    setShowLogin : React.Dispatch<React.SetStateAction<boolean>>
}
const Login : React.FC<LoginProps> = ({setShowLogin}) => {
    const {theme} = useTheme();
    const [formData,setFormData] = useState({});
    const handleChange = (props:{name:string,inputValue:string}) => {
        const {name,inputValue} = props;
        setFormData(prev => {   
            return {...prev,[name]:inputValue}
        })
    }

    console.log(setShowLogin,"setShowLogin")
    return <div className={Styles.login_wrapper}>
        <div className={`${Styles.container} ${Styles[theme]}`}>
            <header className={Styles.header}>Sign In</header >
            <div className={Styles.fields_wrapper}>
                <Input isRequired type="email" label="Email" placeholder="Enter email" name="email" onChange={handleChange}/>
                <Input isRequired type="password" label="Password" placeholder="Enter password" name="password" onChange={handleChange}/>
                <div className={Styles.btn_wrapper}>
                    <button>SIGN IN</button>
                </div>
                <p className={Styles.l_p}>Don't have an account ? <span onClick={() => setShowLogin(prev => !prev)}>Signup</span></p>
            </div>
        </div>
    </div>
}

export default Login