import { deleteTeamById, getTeamById, getTeams, postTeam, putTeamById } from "@/controllers/teams.controllers"
import { validateSchema } from "@/middlewares/schema.validation"
import { teamSchema } from "@/schemas/teams.schemas"

import { Router } from "express"

const teamsRouter = Router()

teamsRouter.get("/teams", getTeams)
teamsRouter.get("/teams/:id", getTeamById)
teamsRouter.post("/teams", validateSchema(teamSchema), postTeam)
teamsRouter.put("/teams/:id", validateSchema(teamSchema), putTeamById)
// teamsRouter.delete("/teams/:id", deleteTeamById)

export default teamsRouter
