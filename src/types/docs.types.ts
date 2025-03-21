import { Doc } from "@prisma/client"

export type CreateDoc = Omit<Doc, "id">
