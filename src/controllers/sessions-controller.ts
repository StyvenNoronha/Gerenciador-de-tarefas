import {Request, Response} from "express"
import {hash} from "bcrypt"
import {prisma} from "@/database/prisma"
import z from "zod"
import { AppError } from "@/utils/AppError"


export class SessionController{
    create(request: Request, response:Response){
        return response.json({message: "ok"})
    }
}
