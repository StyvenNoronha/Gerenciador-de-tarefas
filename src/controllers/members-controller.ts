import {Request, Response} from "express"
import {prisma} from "@/database/prisma"
import z from "zod"

export class Member{
    async create(request: Request, response:Response){
        const bodySchema = z.object({
            user_id:z.number(),
            team_id:z.number()
        })

        const {user_id,team_id} = bodySchema.parse(request.body)

        await prisma.team_Members.create({
            data:{
                userId:user_id,
                teamId: team_id
            }
        })
        return response.status(201).json()
    }

    async index(request: Request, response:Response){
        const member = await prisma.team_Members.findMany({
            include:{
                user:{select:{name:true}},
                team:{select:{name:true}}
            }
        })
        return response.json(member)
    }
}