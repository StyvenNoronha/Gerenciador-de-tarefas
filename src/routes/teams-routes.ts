import { Router} from "express";
import {TeamsController} from "@/controllers/teams-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const teamRoutes = Router()
const teamController = new TeamsController()

teamRoutes.use(ensureAuthenticated)
teamRoutes.post("/", teamController.create)

export{ teamRoutes}

