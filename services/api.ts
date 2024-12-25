import axios from "axios";
import { IUser } from "../Types/types";

const api = axios.create({
    baseURL: "/api",
});

export const createUser = async (user: IUser): Promise<IUser> => {
    const response = await api.post<IUser>("/users", user);
    return response.data;
};

export default api;