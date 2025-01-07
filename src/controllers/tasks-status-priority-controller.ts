import {Request, Response} from "express"
import {prisma} from "@/database/prisma"
import z from "zod"

export class StatusPriorityController{
    async update(request: Request, response:Response){
        const paramsSchema = z.object({
            id: z.string()
        })
        const bodySchema = z.object({
            status: z.enum(["pending","in_progress","completed"])
        })

        const {id} = paramsSchema.parse(request.params)
        const {status} = bodySchema.parse(request.body)

        await prisma.tasks.update({
            data:{
                status
            },
            where:{
                id:Number(id)
            }
        })
        return response.json({message:"atualizado status da tarefa"})

    }

    async updatePriority(request: Request, response:Response){
        const paramsSchema = z.object({
            id: z.string()
        })
        const bodySchema = z.object({
            priority: z.enum(["high","medium","low"])
        })

        const {id} = paramsSchema.parse(request.params)
        const {priority} = bodySchema.parse(request.body)

        await prisma.tasks.update({
            data:{
                priority:priority
            },
            where:{
                id:Number(id)
            }

        })
        return response.json({message:"atualizado prioridade da tarefa"})
    }
}