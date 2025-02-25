import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import {teamRoutes} from "./teams-routes"
import { tasksRoutes } from "./tasks-routes";
import { memberRoutes } from "./member-routes";


const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions",sessionsRoutes)
routes.use("/team",teamRoutes)
routes.use("/task", tasksRoutes)
routes.use("/member", memberRoutes)

export {routes}