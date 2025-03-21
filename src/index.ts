import express, { Express, Request, Response, json } from "express"
import "express-async-errors"
import dotenv from "dotenv"
import errorHandlerMiddleware from "@/middlewares/error.validation"
import areasRouter from "@/routers/areas.router"
import docsRouter from "@/routers/docs.router"
import toolsRouter from "@/routers/tools.router"

dotenv.config()

const app: Express = express()
app.use(json())

app.get("/health", (_req: Request, res: Response): void => {
  res.send("I'm OK!")
})

app.use(areasRouter)
app.use(docsRouter)
app.use(toolsRouter)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server is running on port " + port))
