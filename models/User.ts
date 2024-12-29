import { Schema, model, models } from "mongoose";
import { IUser } from "../src/@types/types";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = models.User || model<IUser>('User', userSchema);

export default User;