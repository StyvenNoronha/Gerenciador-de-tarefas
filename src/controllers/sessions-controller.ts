import {Request, Response} from "express"
import {compare} from "bcrypt"
import {prisma} from "@/database/prisma"
import z from "zod"
import { AppError } from "@/utils/AppError"
import {authConfig} from "@/configs/auth"
import {sign} from "jsonwebtoken"


export class SessionController{
    async create(request: Request, response:Response){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(3)
        })      
        const { email, password} = bodySchema.parse(request.body)
        
        const user = await prisma.users.findFirst({
            where:{email},
        })
        if(!user){
            throw new AppError("email ou senha invalido", 401)
        }

        const passwordMatched = await compare(password, user.password)
        if(!passwordMatched){
            throw new AppError("email ou senha invalido", 401)
        }

        const {secret, expiresIn} = authConfig.jwt

        const token = sign({role:user.role ?? "admin"}, secret,{
            subject: String(user.id),
            expiresIn,
        })

        const {password: _, ...userWithoutPassword} = user

        return response.json({token, user: userWithoutPassword})
    }
}
