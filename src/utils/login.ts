import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const chaveSecreta = process.env.JWT_SECRET || 'chave_padrao_secreta';

export async function login(req: Request, res: Response){
    const {email, senha} = req.body

    try { 
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if(user && (await bcrypt.compare(senha, user.senha))){
            const token = jwt.sign({ userId: user.id }, chaveSecreta, { expiresIn: '1h' });
            res.status(200).json({token})
        }else{
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (error) {
        throw error
    }

}