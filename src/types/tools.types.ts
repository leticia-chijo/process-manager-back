import { Tool } from "@prisma/client"

export type ToolBody = Omit<Tool, "id">
