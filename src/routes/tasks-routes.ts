import { Router} from "express";
import {TasksController} from "@/controllers/tasks-controller"
import { verifyUser } from "@/middlewares/verifyUser";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import {StatusPriorityController} from "@/controllers/tasks-status-priority-controller"

const tasksRoutes = Router()
const tasksController = new TasksController()
const statusPriorityController = new StatusPriorityController()
tasksRoutes.use(ensureAuthenticated, verifyUser(["admin"]))
tasksRoutes.post("/", tasksController.create)
tasksRoutes.get("/", tasksController.index)
tasksRoutes.patch("/:id/status", statusPriorityController.update)
tasksRoutes.patch("/:id/priority", statusPriorityController.updatePriority)

export{tasksRoutes}