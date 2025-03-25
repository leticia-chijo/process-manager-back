import prisma from "@/database/database"
import { ProcessBody } from "@/types/process.types"

const selection = {
  id: true,
  title: true,
  priority: true,
  parentId: true,
  team: {
    select: {
      id: true,
      name: true,
      area: {
        select: {
          name: true
        }
      }
    }
  },
  processDocs: { select: { doc: true } },
  processTools: { select: { tool: true, purpose: true } }
}

async function create(process: ProcessBody) {
  const { title, teamId, priority, parentId, docs, tools } = process
  const data = { title, teamId, priority, parentId }

  return await prisma.process.create({
    data: {
      ...data,
      processDocs: {
        create: docs.map((docId) => ({ docId }))
      },
      processTools: {
        create: tools.map(({ id, purpose }) => ({
          toolId: id,
          purpose
        }))
      }
    },
    select: selection
  })
}

async function readAll() {
  return prisma.process.findMany({ select: selection })
}

async function readById(id: number) {
  return prisma.process.findUnique({
    where: { id },
    select: selection
  })
}

async function updateById(id: number, process: ProcessBody) {
  const { title, teamId, priority, parentId, docs, tools } = process
  const data = { title, teamId, priority, parentId }

  return await prisma.process.update({
    where: { id },
    data: {
      ...data,
      processDocs: {
        deleteMany: {},
        create: docs.map((docId) => ({ docId }))
      },
      processTools: {
        deleteMany: {},
        create: tools.map(({ id, purpose }) => ({
          toolId: id,
          purpose
        }))
      }
    },
    select: selection
  })
}

async function deleteById(id: number) {
  return prisma.process.delete({
    where: { id }
  })
}

async function findByTitle(process: ProcessBody) {
  return prisma.process.findFirst({
    where: { title: process.title }
  })
}

async function findById(id: number) {
  return prisma.process.findUnique({
    where: { id }
  })
}

export const processRepository = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
  findByTitle,
  findById
}
