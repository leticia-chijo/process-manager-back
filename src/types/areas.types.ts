import { Area } from "@prisma/client"

export type CreateArea = Omit<Area, "id">
