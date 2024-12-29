import axios from "axios";
import { IUser } from "../@types/types";

const api = axios.create({
    baseURL: "https://auth-server-mongodb.onrender.com/api",
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