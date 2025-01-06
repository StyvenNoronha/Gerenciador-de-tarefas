import { Router} from "express";
import {TeamsController} from "@/controllers/teams-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUser } from "@/middlewares/verifyUser";
const teamRoutes = Router()
const teamController = new TeamsController()

teamRoutes.use(ensureAuthenticated, verifyUser(["admin"]))
teamRoutes.post("/", teamController.create)

export{ teamRoutes}

