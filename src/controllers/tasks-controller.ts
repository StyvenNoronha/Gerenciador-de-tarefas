import {Request, Response} from "express"
import {compare} from "bcrypt"
import {prisma} from "@/database/prisma"
import z from "zod"
import { AppError } from "@/utils/AppError"
import {authConfig} from "@/configs/auth"
import {sign} from "jsonwebtoken"


export class TasksController{
    async create(request: Request, response:Response){
        const bodySchema = z.object({
            title: z.string(),
            description: z.string(),
            assigned_id: z.number(),
            team_id: z.number()
        })
        const { title,description,assigned_id,team_id} = bodySchema.parse(request.body)

        await prisma.tasks.create({
            data:{
                title:title,
                description:description,
                assignedTo: assigned_id,
                teamId: team_id
            }
        })
        return response.status(201).json()
    }
}