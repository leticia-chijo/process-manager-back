import { conflictError, notFoundError } from "@/errors/errors"
import { areasRepository } from "@/repositories/areas.repository"
import { CreateArea } from "@/types/areas.types"

async function verifyIdExists(id: number) {
  const idExists = await areasRepository.findById(id)
  if (!idExists) throw notFoundError("Essa área não existe!")
}

async function verifyConflict(area: CreateArea) {
  const nameExists = await areasRepository.findByName(area)
  if (nameExists) throw conflictError("Já existe uma área com esse nome!")
}

async function create(area: CreateArea) {
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

async function updateById(id: number, area: CreateArea) {
  await verifyIdExists(id)
  await verifyConflict(area)
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
