import { Router} from "express";
import {TasksController} from "@/controllers/tasks-controller"
import { verifyUser } from "@/middlewares/verifyUser";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import {StatusPriorityController} from "@/controllers/tasks-status-priority-controller"

const tasksRoutes = Router()
const tasksController = new TasksController()
const statusPriorityController = new StatusPriorityController()
tasksRoutes.use(ensureAuthenticated)
tasksRoutes.post("/", tasksController.create , verifyUser(["admin"]))
tasksRoutes.get("/", tasksController.index , verifyUser(["admin","member"]))
tasksRoutes.patch("/:id/status", verifyUser(["member", "admin"]), statusPriorityController.update)
tasksRoutes.patch("/:id/priority", statusPriorityController.updatePriority , verifyUser(["admin"]))
tasksRoutes.delete("/:id/delete",tasksController.delete , verifyUser(["admin"]))
export{tasksRoutes}