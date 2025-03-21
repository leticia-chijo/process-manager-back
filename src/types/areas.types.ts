import { Area } from "@prisma/client"

export type AreaBody = Omit<Area, "id">
