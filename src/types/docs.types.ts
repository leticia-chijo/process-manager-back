import { Doc } from "@prisma/client"

export type DocBody = Omit<Doc, "id">
