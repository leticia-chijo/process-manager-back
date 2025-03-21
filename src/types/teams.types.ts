import { Team } from "@prisma/client"

export type CreateTeam = Omit<Team, "id">
