import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGODB_URI || "");

let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db();
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Email ou senha ausente");
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ email });

      if (!user) {
        console.log("Usuário não encontrado");
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      console.log("Usuário encontrado:", user);

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        console.log("Senha incorreta");
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      console.log("Senha correta");

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "secret-key",
        { expiresIn: "1h" }
      );

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Erro no servidor:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  } else {
    console.log("Método não permitido");
    res.status(405).json({ message: "Método não permitido" });
  }
}

export default handler;
