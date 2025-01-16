import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios-instance";

interface APICallProps {
    url:string;
    params?:Record<string,any>;
    config?:AxiosRequestConfig;
    payload?:any
}

export const handleGetAPICall = async<T> ({url,params,config}:APICallProps):Promise<T> => {
    try {
        const response = await axiosInstance.get<T>(url,{
            params,
            ...config
        })
        if(response?.status === 200){
            return response?.data
        } else {
            throw new Error("Something went wrong")
        }
    } catch (error:any) {
        throw error.response?.data || error.message;
    }
}

export const handlePostAPICall = async <T>({url,payload,config}:APICallProps): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, payload, config);
    if(response?.status === 201 || response?.status === 200){
            return response?.data
        } else {
            throw new Error("Something went wrong")
        }
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const handlePutAPICall = async <T>({url,payload,config}:APICallProps): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(url, payload, config);
    if(response?.status === 200){
        return response?.data
    } else {
        throw new Error("Something went wrong")
    }
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const handleDeleteAPICall = async <T>({url,params,config}:APICallProps): Promise<T> => {
  try {
    const response = await axiosInstance.delete<T>(url, {
      params,
      ...config,
    });
    if(response?.status === 200){
        return response?.data
    } else {
        throw new Error("Something went wrong")
    }
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};