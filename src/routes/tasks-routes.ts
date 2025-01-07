import { Router} from "express";
import {TasksController} from "@/controllers/tasks-controller"
import { verifyUser } from "@/middlewares/verifyUser";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";


const tasksRoutes = Router()
const tasksController = new TasksController()
tasksRoutes.use(ensureAuthenticated, verifyUser(["admin"]))
tasksRoutes.post("/", tasksController.create)
tasksRoutes.get("/", tasksController.index)

export{tasksRoutes}