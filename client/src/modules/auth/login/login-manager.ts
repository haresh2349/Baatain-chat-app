import { AppURL } from "../../../api/api-end-points";
import { handlePostAPICall } from "../../../api/api-managers";
import { LoginUserType } from "./Login";

export interface ValidateInputProps {
    name: string;
    value: string;
    type: string;
    formData?: Record<string, any>;
}

export const validateInputField = ({value,type,name,formData}:ValidateInputProps) => {
    if(name === "confirmPassword") {
        if(formData?.newPassword !== value){
            return "Password is not matching with above password!"
        }
    }
    return null
}

interface HandleLoginErrorsProps {
    formData:LoginUserType;
    setErrors:React.Dispatch<React.SetStateAction<LoginUserType>>
}

export const handleLoginErrors = ({formData,setErrors}:HandleLoginErrorsProps) => {
    const fieldsToCheck : (keyof LoginUserType)[]  = ["email","password"];
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

interface HandleLoginUserProps {
    payload:LoginUserType;
    next:(data:LoginResponseDataType) => void
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}

export type LoginResponseDataType = {
    token:string,
    id:string
}

interface APIResponse {
  data: LoginResponseDataType;
  status: number;
  message?: string;
}

export const handleLoginUser = ({payload,setIsLoading,next}:HandleLoginUserProps) => {
    setIsLoading && setIsLoading(true);
    handlePostAPICall<APIResponse>({url:AppURL.login,payload})
    .then(res => {
        const data = res?.data;
        next && next(data)
    })
    .catch((err:any) => console.error(err))
    .finally(() => {
        setIsLoading && setIsLoading(false)
    })
}

