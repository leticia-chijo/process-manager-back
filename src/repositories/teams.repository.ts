import prisma from "@/database/database"
import { TeamBody } from "@/types/teams.types"

async function create(team: TeamBody) {
  return prisma.team.create({
    data: { ...team }
  })
}

async function readAll() {
  return prisma.team.findMany({
    select: {
      id: true,
      name: true,
      area: true
    }
  })
}

async function readById(id: number) {
  return prisma.team.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      area: true
    }
  })
}

async function updateById(id: number, team: TeamBody) {
  return prisma.team.update({
    where: { id },
    data: { ...team }
  })
}

async function deleteById(id: number) {
  return prisma.team.delete({
    where: { id }
  })
}

async function findByName(team: TeamBody) {
  return prisma.team.findFirst({
    where: { name: team.name }
  })
}

async function findById(id: number) {
  return prisma.team.findUnique({
    where: { id }
  })
}

export const teamsRepository = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
  findByName,
  findById
}
