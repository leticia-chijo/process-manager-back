import { deleteProcessById, getProcessById, getProcesses, getProcessesNested, postProcess, putProcessById } from "@/controllers/process.controllers"
import { validateSchema } from "@/middlewares/schema.validation"
import { processSchema } from "@/schemas/process.schemas"
import { Router } from "express"

const processRouter = Router()

processRouter.get("/process/list", getProcesses)
processRouter.get("/process/nested", getProcessesNested)
processRouter.get("/process/:id", getProcessById)
processRouter.post("/process", validateSchema(processSchema), postProcess)
processRouter.put("/process/:id", validateSchema(processSchema), putProcessById)
// processRouter.delete("/process/:id", deleteProcessById)

export default processRouter
