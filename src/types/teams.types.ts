import { Team } from "@prisma/client"

export type TeamBody = Omit<Team, "id">
