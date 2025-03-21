import { conflictError, notFoundError } from "@/errors/errors"
import { areasRepository } from "@/repositories/areas.repository"
import { AreaBody } from "@/types/areas.types"

async function verifyIdExists(id: number) {
  const idExists = await areasRepository.findById(id)
  if (!idExists) throw notFoundError("Essa área não existe!")
}

async function verifyConflict(area: AreaBody, id: number = -1) {
  const nameExists = await areasRepository.findByName(area)
  if (nameExists && (id !== nameExists.id || id === -1)) {
    throw conflictError("Já existe uma área com esse nome!")
  }
}

async function create(area: AreaBody) {
  await verifyConflict(area)
  return await areasRepository.create(area)
}

async function readAll() {
  return await areasRepository.readAll()
}

async function readById(id: number) {
  await verifyIdExists(id)
  return await areasRepository.readById(id)
}

async function updateById(id: number, area: AreaBody) {
  await verifyIdExists(id)
  await verifyConflict(area, id)

  return await areasRepository.updateById(id, area)
}

async function deleteById(id: number) {
  await verifyIdExists(id)
  return await areasRepository.deleteById(id)
}

export const areaServices = {
  create,
  readAll,
  readById,
  updateById,
  deleteById
}
