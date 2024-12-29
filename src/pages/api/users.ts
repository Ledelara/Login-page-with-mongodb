import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    return res.status(400).json({ success: false, message: "Name, email, and password are required" });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const user = await User.create({ name, email, password: hashedPassword });

                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, message: error });
            }
            break;

        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
