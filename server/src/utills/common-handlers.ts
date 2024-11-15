class ApiError extends Error {
    statusCode:number;
    success: boolean;
    data: any;
    errors:Array<{field?:String,message:String}>

    constructor(
        statusCode: number,
        message: string = "Something went wrong!",
        errors: Array<{field?:String,message:String}> = [],
        stack:string = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        } 
    }
}

class ApiResponse<T = any> {
    statusCode: number
    message: string
    data: T
    constructor(statusCode:number,message:string,data:T) {
        this.statusCode = statusCode;
        this.message = message || "Success"
        this.data = data
    }
}

export {ApiError,ApiResponse}