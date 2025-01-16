import { AppURL } from "../../../api/api-end-points";
import { handleGetAPICall, handlePostAPICall } from "../../../api/api-managers";
import { SingupUserType } from "./Signup";
interface HandleErrorsProps {
    formData: SingupUserType;
    setErrors:React.Dispatch<React.SetStateAction<SingupUserType>>;
}

export const handleSignupErrors = ({formData,setErrors}:HandleErrorsProps) => {
    const fieldsToCheck : (keyof SingupUserType)[]  = ["userName","email","password"];
    let isError = false;
    fieldsToCheck?.map((field) => {
        if(!formData[field]){
            isError = true;
            setErrors(prev => ({...prev,[field]:`${field} is required!`}));
        } else {
            if(field === "email"){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (formData?.email && !emailRegex.test(formData.email)) {
                    isError = true;
                    setErrors(prev => ({...prev,email:"Enter valid email!"}))
                    return
                } else {
                    setErrors(prev => ({...prev,[field]:null}))
                }
            }
        }
    })
    return isError
}

export type HandleValidateProps = {
    e:React.ChangeEvent<HTMLInputElement>,
    formData?:SingupUserType
}

export const handleValidate = ({e,formData}:HandleValidateProps) => {
    const {name,value} = e.target;
    if(name === "confirmPassword"){
        if(value && formData?.password !== value){
            return "Confirm password is not matching with password!"
        } else {
            return null;
        }
    }
    return null
}

interface HandleFindUserByNameOrEmailProps {
    params : {
        email?:string,
        name?:string
    }
}
export const handleFindUserByNameOrEmail = ({params}:HandleFindUserByNameOrEmailProps) => {
    handleGetAPICall({url:AppURL.getUsers,params})
    .then(res => {
        // console.log(res?.data,"res from user")
    })
}

interface HandleRegisterUserProps {
    payload:SingupUserType;
    next:() => void
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}

export const handleRegisterUser = ({payload,setIsLoading,next}:HandleRegisterUserProps) => {
    setIsLoading(true);
    const requestPayload = {
        userName:payload?.userName,
        email:payload?.email,
        password:payload?.password
    }
    debugger
    handlePostAPICall({url:AppURL.registerUser,payload: requestPayload})
    .then((res) => {
        next && next()
    })
    .finally(() => setIsLoading(false))
}