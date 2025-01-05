import {Request, Response} from "express"
import {hash} from "bcrypt"
import {prisma} from "@/database/prisma"
import z from "zod"
import { AppError } from "@/utils/AppError"

class UsersController{
    async create(request: Request, response:Response){
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(3)
        })
        const {name, email, password} = bodySchema.parse(request.body)

        const userWithSame = await prisma.users.findFirst({where:{email}})
        if(userWithSame){
            throw new AppError("JÁ existe esse email")
        }

        const hashPassword = await hash(password, 8)


        const user = await prisma.users.create({
            data:{
                name,
                email,
                password: hashPassword,
            }
        })

        const {password: _, ...userWithoutPassword} = user


        return response.status(201).json(userWithoutPassword)
    }
}

export {UsersController}
