import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const user = await User.create(req.body);
                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;

        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}