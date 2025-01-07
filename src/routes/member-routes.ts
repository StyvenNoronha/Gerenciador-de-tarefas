import { Router} from "express";
import { Member} from "@/controllers/members-controller";

const memberRoutes = Router()
const   memberController = new Member()

memberRoutes.post("/", memberController.create)
memberRoutes.get("/", memberController.index)

export {memberRoutes}