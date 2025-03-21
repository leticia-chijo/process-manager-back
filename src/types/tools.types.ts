import { Tool } from "@prisma/client"

export type CreateTool = Omit<Tool, "id">
