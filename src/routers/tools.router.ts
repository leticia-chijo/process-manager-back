
import { deleteToolById, getToolById, getTools, postTool, putToolById } from "@/controllers/tools.controllers"
import { validateSchema } from "@/middlewares/schema.validation"
import { toolSchema } from "@/schemas/tools.schemas"

import { Router } from "express"

const toolsRouter = Router()

toolsRouter.get("/tools", getTools)
toolsRouter.get("/tools/:id", getToolById)
toolsRouter.post("/tools", validateSchema(toolSchema), postTool)
toolsRouter.put("/tools/:id", validateSchema(toolSchema), putToolById)
// toolsRouter.delete("/tools/:id", deleteToolById)

export default toolsRouter
