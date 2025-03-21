import { deleteProcessById, getProcessById, getProcesses, postProcess, putProcessById } from "@/controllers/process.controllers"
import { validateSchema } from "@/middlewares/schema.validation"
import { processSchema } from "@/schemas/process.schemas"
import { Router } from "express"

const processRouter = Router()

processRouter.get("/process", getProcesses)
processRouter.get("/process/:id", getProcessById)
processRouter.post("/process", validateSchema(processSchema), postProcess)
processRouter.put("/process/:id", validateSchema(processSchema), putProcessById)
// processRouter.delete("/process/:id", deleteProcessById)

export default processRouter
