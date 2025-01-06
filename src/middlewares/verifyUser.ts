import {Request, Response, NextFunction} from "express"
import { AppError } from "@/utils/AppError"



export function verifyUser(role:string[]){
    return (request:Request, response:Response, next:NextFunction) =>{
       if(!request.user){
        throw new AppError("Não autorizado",401)
       }
       if(!role.includes(request.user.role)){
        throw new AppError("Não autorizado",401)
       }

       return next()
    }
}