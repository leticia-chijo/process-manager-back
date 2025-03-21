import prisma from "@/database/database"
import { CreateTool } from "@/types/tools.types"

async function create(tool: CreateTool) {
  return prisma.tool.create({
    data: { ...tool }
  })
}

async function readAll() {
  return prisma.tool.findMany()
}

async function readById(id: number) {
  return prisma.tool.findUnique({
    where: { id }
  })
}

async function updateById(id: number, tool: CreateTool) {
  return prisma.tool.update({
    where: { id },
    data: { ...tool }
  })
}

async function deleteById(id: number) {
  return prisma.tool.delete({
    where: { id }
  })
}

async function findByName(tool: CreateTool) {
  return prisma.tool.findFirst({
    where: { name: tool.name }
  })
}

async function findById(id: number) {
  return prisma.tool.findUnique({
    where: { id }
  })
}

export const toolsRepository = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
  findByName,
  findById
}
