import { deleteAreaById, getAreaById, getAreas, postArea, putAreaById } from "@/controllers/areas.controllers"
import { validateSchema } from "@/middlewares/schema.validation"
import { areaSchema } from "@/schemas/areas.schemas"
import { Router } from "express"

const areasRouter = Router()

areasRouter.get("/areas", getAreas)
areasRouter.get("/areas/:id", getAreaById)
areasRouter.post("/areas", validateSchema(areaSchema), postArea)
areasRouter.put("/areas/:id", validateSchema(areaSchema), putAreaById)
// areasRouter.delete("/areas/:id", deleteAreaById)

export default areasRouter
