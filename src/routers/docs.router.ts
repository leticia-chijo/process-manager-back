
import { deleteDocById, getDocById, getDocs, postDoc, putDocById } from "@/controllers/docs.controllers"
import { validateSchema } from "@/middlewares/schema.validation"
import { docSchema } from "@/schemas/docs.schemas"

import { Router } from "express"

const docsRouter = Router()

docsRouter.get("/docs", getDocs)
docsRouter.get("/docs/:id", getDocById)
docsRouter.post("/docs", validateSchema(docSchema), postDoc)
docsRouter.put("/docs/:id", validateSchema(docSchema), putDocById)
// docsRouter.delete("/docs/:id", deleteDocById)

export default docsRouter
