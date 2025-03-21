import { conflictError, notFoundError } from "@/errors/errors"
import { areasRepository } from "@/repositories/areas.repository"
import { teamsRepository } from "@/repositories/teams.repository"
import { TeamBody } from "@/types/teams.types"

async function verifyIdExists(id: number) {
  const idExists = await teamsRepository.findById(id)
  if (!idExists) throw notFoundError("Esse time não existe!")
}

async function verifyConflict(team: TeamBody, id: number = -1) {
  const nameExists = await teamsRepository.findByName(team)
  if (nameExists && (id !== nameExists.id || id === -1)) {
    throw conflictError("Já existe um time com esse nome!")
  }
}

async function verifyAreaExists(id: number) {
  const idExists = await areasRepository.findById(id)
  if (!idExists) throw notFoundError("Essa área não existe!")
}

async function create(team: TeamBody) {
  await verifyAreaExists(team.areaId)
  await verifyConflict(team)
  return await teamsRepository.create(team)
}

async function readAll() {
  return await teamsRepository.readAll()
}

async function readById(id: number) {
  await verifyIdExists(id)
  return await teamsRepository.readById(id)
}

async function updateById(id: number, team: TeamBody) {
  await verifyIdExists(id)
  await verifyAreaExists(team.areaId)
  await verifyConflict(team, id)

  return await teamsRepository.updateById(id, team)
}

async function deleteById(id: number) {
  await verifyIdExists(id)
  return await teamsRepository.deleteById(id)
}

export const teamsServices = {
  create,
  readAll,
  readById,
  updateById,
  deleteById
}
