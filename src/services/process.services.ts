import { conflictError, notFoundError } from "@/errors/errors"
import { processRepository } from "@/repositories/process.repository"
import { teamsRepository } from "@/repositories/teams.repository"
import { ProcessBody, ProcessWithRelations } from "@/types/process.types"

async function verifyIdExists(id: number) {
  const idExists = await processRepository.findById(id)
  if (!idExists) throw notFoundError("Esse processo não existe!")
}

async function verifyConflict(process: ProcessBody, id: number = -1) {
  const nameExists = await processRepository.findByTitle(process)
  if (nameExists && (id !== nameExists.id || id === -1)) {
    throw conflictError("Já existe um processo com esse título!")
  }
}

async function verifyTeamExists(id: number) {
  const idExists = await teamsRepository.findById(id)
  if (!idExists) throw notFoundError("Esse time não existe!")
}

function formatResponse(process: ProcessWithRelations) {
  const formattedProcess = {
    ...process,
    docs: process.processDocs.map(({ doc }) => doc),
    tools: process.processTools.map(({ tool, purpose }) => ({ ...tool, purpose }))
  }

  delete formattedProcess.processDocs
  delete formattedProcess.processTools
  return formattedProcess
}

async function create(process: ProcessBody) {
  await verifyTeamExists(process.teamId)
  await verifyConflict(process)

  const createdProcess = await processRepository.create(process)
  return formatResponse(createdProcess)
}

async function readAll() {
  const allProcesses = await processRepository.readAll()
  return allProcesses.map(formatResponse)
}

async function readById(id: number) {
  await verifyIdExists(id)
  const process = await processRepository.readById(id)
  return formatResponse(process)
}

async function updateById(id: number, process: ProcessBody) {
  await verifyIdExists(id)
  await verifyTeamExists(process.teamId)
  await verifyConflict(process, id)
  
  const updatedProcess = await processRepository.updateById(id, process)
  return formatResponse(updatedProcess)
}

async function deleteById(id: number) {
  await verifyIdExists(id)
  return await processRepository.deleteById(id)
}

export const processServices = {
  create,
  readAll,
  readById,
  updateById,
  deleteById
}
