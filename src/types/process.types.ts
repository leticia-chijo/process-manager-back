import { Area, Doc, Process, Team, Tool } from "@prisma/client"

export type ProcessTool = {
  id: number
  purpose: string
}

export type ProcessBody = Omit<Process, "id"> & {
  docs: number[]
  tools: ProcessTool[]
}

export type ProcessWithRelations = Omit<Process, "teamId"> & {
  processDocs: { doc: Doc }[]
  processTools: { tool: Tool; purpose: string }[]
  team: Omit<Team, "areaId"> & { area: { name: string } }
}

export type FormattedProcess = Omit<ProcessWithRelations, "teamId" | "processDocs" | "processTools"> & {
  docs: Doc[]
  tools: (Tool & { purpose: string })[]
  subProcesses?: FormattedProcess[]
}
