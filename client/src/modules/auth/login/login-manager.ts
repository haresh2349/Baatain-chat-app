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