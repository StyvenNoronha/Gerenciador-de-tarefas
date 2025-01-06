import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import {teamRoutes} from "./teams-routes"
const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions",sessionsRoutes)
routes.use("/team",teamRoutes)
export {routes}