import prisma from "@/database/database"
import { ToolBody } from "@/types/tools.types"

async function create(tool: ToolBody) {
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

async function updateById(id: number, tool: ToolBody) {
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

async function findByName(tool: ToolBody) {
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
