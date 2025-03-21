import { conflictError, notFoundError } from "@/errors/errors"
import { toolsRepository } from "@/repositories/tools.repository"
import { ToolBody } from "@/types/tools.types"

async function verifyIdExists(id: number) {
  const idExists = await toolsRepository.findById(id)
  if (!idExists) throw notFoundError("Essa ferramenta não existe!")
}

async function verifyConflict(tool: ToolBody, id: number = -1) {
  const nameExists = await toolsRepository.findByName(tool)
  if (nameExists && (id !== nameExists.id || id === -1)) {
    throw conflictError("Já existe uma ferramenta com esse nome!")
  }
}

async function create(tool: ToolBody) {
  await verifyConflict(tool)
  return await toolsRepository.create(tool)
}

async function readAll() {
  return await toolsRepository.readAll()
}

async function readById(id: number) {
  await verifyIdExists(id)
  return await toolsRepository.readById(id)
}

async function updateById(id: number, tool: ToolBody) {
  await verifyIdExists(id)
  await verifyConflict(tool, id)
  
  return await toolsRepository.updateById(id, tool)
}

async function deleteById(id: number) {
  await verifyIdExists(id)
  return await toolsRepository.deleteById(id)
}

export const toolsServices = {
  create,
  readAll,
  readById,
  updateById,
  deleteById
}
