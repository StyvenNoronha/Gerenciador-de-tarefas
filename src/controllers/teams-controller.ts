import {Request, Response} from "express"
import {compare} from "bcrypt"
import {prisma} from "@/database/prisma"
import z from "zod"
import { AppError } from "@/utils/AppError"
import {authConfig} from "@/configs/auth"
import {sign} from "jsonwebtoken"


export class TeamsController{
    create(request: Request, response:Response){
        return response.json({message:"ok"})
    }
}