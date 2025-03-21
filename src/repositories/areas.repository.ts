import prisma from "@/database/database"
import { CreateArea } from "@/types/areas.types"

async function create(area: CreateArea) {
  return prisma.area.create({
    data: { ...area }
  })
}

async function readAll() {
  return prisma.area.findMany()
}

async function readById(id: number) {
  return prisma.area.findUnique({
    where: { id }
  })
}

async function updateById(id: number, area: CreateArea) {
  return prisma.area.update({
    where: { id },
    data: { ...area }
  })
}

async function deleteById(id: number) {
  return prisma.area.delete({
    where: { id }
  })
}

async function findByName(area: CreateArea) {
  return prisma.area.findFirst({
    where: { name: area.name }
  })
}

async function findById(id: number) {
  return prisma.area.findUnique({
    where: { id }
  })
}

export const areasRepository = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
  findByName,
  findById
}
