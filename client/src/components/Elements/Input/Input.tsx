import { useEffect, useState } from "react";
import Styles from "./input.module.css"
import { ValidateInputProps } from "../../../modules/auth/login/login-manager";
import { FaRegEyeSlash } from "react-icons/fa";
import { HandleValidateProps } from "../../../modules/auth/signup/signup-manager";

interface InputProps {
    value?:string;
    label:string;
    name:string;
    type?:string;
    isError?:boolean | null;
    validate?:(e:React.ChangeEvent<HTMLInputElement>) => string | null;
    isRequired?:boolean;
    placeholder:string;
    errorMessage?:string | null;
    onChange:(props:{name:string,inputValue:string}) => void;
    onBlur?:(props:{name:string,inputValue:string}) => void;
}

export const Input : React.FC<InputProps> = ({label,value,type="",name="",onChange,onBlur,placeholder,isRequired,errorMessage=null,validate}) => {
    const [touched,setTouhed] = useState(false);
    const [error,setError] = useState<string | null>(errorMessage);


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange({name,inputValue});
        if(type === "email"){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(inputValue?.length){
                if (!emailRegex.test(inputValue)) {
                    setError("Invalid email address");
                    return
                }
            }
        }

        if (validate) {
        const validationError = validate(e);
            setError(validationError);
        } else if (isRequired && !inputValue) {
            setError(`${label} is required!`);
        } else {
            setError(null);
        }

    }

    const handleBlur = (e:React.FocusEvent<HTMLInputElement>) => {
        setTouhed(true);
        const inputValue = e.target.value;
        if(isRequired && !inputValue) {
            setError(`${label} is required!`)
        }
        onBlur && onBlur({name,inputValue})
    }

    useEffect(() => {
        setError(errorMessage)
    },[errorMessage])

    console.log(error,"errorMessage")
    return <div className={Styles.input_container}>
        {label && <label>{label}{isRequired ? <sup style={{color:"red"}}>*</sup>:<></>}</label>}
        <div className={error ? `${Styles.inputError} ${Styles.inp_wrapper}` : Styles.inp_wrapper}>
            <input
                onChange={handleChange}
                name={name}
                onBlur={handleBlur}
                value={value ? value : undefined}
                placeholder={placeholder}
                aria-invalid={!!error && touched}
            />
            {/* {type === "password" && <span><FaRegEyeSlash/></span>} */}
        </div>
        {error && <span className={Styles.errorMesage}>{error}</span>}
    </div>
}