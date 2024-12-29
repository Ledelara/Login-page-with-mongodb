import axios from "axios";
import { IUser } from "../@types/types";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const createUser = async (user: IUser): Promise<IUser> => {
    const response = await api.post<IUser>("/auth/register", user);
    return response.data;
};

export const loginUser = async (user: IUser): Promise<IUser> => {
    const response = await api.post<IUser>("/auth/login", user);
    return response.data;   
}

export default api;