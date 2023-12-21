import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthRequest extends Request{
    userId?: string | JwtPayload
}

const prisma = new PrismaClient()
const chaveSecreta = process.env.JWT_SECRET || 'chave_padrao_secreta';

export async function login(req: Request, res: Response){
    const {email, senha} = req.body

    try { 
        const user = await prisma.user.findUnique({ where: { email } })
    
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

export async function verifyToken(req: AuthRequest, res: Response, next:() => void) {
    const token = req.headers['authorization']


    if(!token){
        return res.status(403).json({message: 'Token não fornecido'})
    }

    jwt.verify(token, chaveSecreta, (err, decode) =>{
        if(err || !decode){
            return res.status(401).json({message: "Token invalido"})
        }
        req.userId = decode

        next()
    })
}