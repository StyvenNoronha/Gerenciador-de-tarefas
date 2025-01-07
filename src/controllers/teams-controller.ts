import {Request, Response} from "express"
import {compare} from "bcrypt"
import {prisma} from "@/database/prisma"
import z from "zod"
import { AppError } from "@/utils/AppError"
import {authConfig} from "@/configs/auth"
import {sign} from "jsonwebtoken"


export class TeamsController{
    async create(request: Request, response:Response){
        const bodySchema = z.object({
            name: z.string(),
            description: z.string(),
        })
        const {name, description} = bodySchema.parse(request.body)

        await prisma.teams.create({
            data:{
                name:name,
                description:description
            }
        })
        return response.status(201).json()
    }
}