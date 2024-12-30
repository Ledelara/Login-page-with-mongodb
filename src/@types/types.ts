export interface IUser {
    name?: string;
    email: string;
    password: string;
    token?: string; 
}

export interface ILoginResponse {
    user: IUser;
    token: string;
}