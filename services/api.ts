import axios from "axios";
import { IUser } from "../Types/types";

const api = axios.create({
  baseURL: "/api",
});

export const createUser = async (user: IUser): Promise<IUser> => {
  const response = await api.post<IUser>("/users", user);
  return response.data;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Erro ao autenticar usuário.");
  }

  const data = await response.json();
  return data;
};

export default api;
