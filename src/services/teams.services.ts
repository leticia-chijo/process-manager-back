import { conflictError, notFoundError } from "@/errors/errors"
import { areasRepository } from "@/repositories/areas.repository"
import { teamsRepository } from "@/repositories/teams.repository"
import { CreateTeam } from "@/types/teams.types"

async function verifyIdExists(id: number) {
  const idExists = await teamsRepository.findById(id)
  if (!idExists) throw notFoundError("Esse time não existe!")
}

async function verifyConflict(team: CreateTeam) {
  const nameExists = await teamsRepository.findByName(team)
  if (nameExists) throw conflictError("Já existe um time com esse nome!")
}

async function verifyAreaExists(id: number) {
  const idExists = await areasRepository.findById(id)
  if (!idExists) throw notFoundError("Essa área não existe!")
}

async function create(team: CreateTeam) {
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

async function updateById(id: number, team: CreateTeam) {
  await verifyIdExists(id)
  await verifyAreaExists(team.areaId)
  await verifyConflict(team)
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
