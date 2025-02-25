import {Request, Response} from "express"
import {prisma} from "@/database/prisma"
import z from "zod"



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

    async index(request: Request, response:Response){
        const task = await prisma.tasks.findMany({
            include:{
                team:{select:{name:true, members:true}}
            }
        })
        
        return response.json(task)
    }

    async delete(request: Request, response:Response){
        const {id} = request.params

        await prisma.tasks.delete({where:{id:Number(id)}})
        return response.json({message:"Tarefa deletada "})
    }
}