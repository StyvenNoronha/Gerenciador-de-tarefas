import { Router} from "express";
import { Member} from "@/controllers/members-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUser } from "@/middlewares/verifyUser";
const memberRoutes = Router()
const   memberController = new Member()
memberRoutes.use(ensureAuthenticated, verifyUser(["admin"]))
memberRoutes.post("/", memberController.create)
memberRoutes.get("/", memberController.index)

export {memberRoutes}