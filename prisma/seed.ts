import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync("senha123", 10)

async function main() {
  console.log("🌱 Starting seed...")

  // Criar Áreas
  const areaPeople = await prisma.area.create({
    data: { name: "Pessoas" }
  })

  const areaTech = await prisma.area.create({
    data: { name: "Tecnologia" }
  })

  // Criar Times
  const recruitmentTeam = await prisma.team.create({
    data: {
      name: "Recrutamento",
      areaId: areaPeople.id
    }
  })

  const growthTeam = await prisma.team.create({
    data: {
      name: "Desenvolvimento Funcionários",
      areaId: areaPeople.id
    }
  })

  const devTeam = await prisma.team.create({
    data: {
      name: "Desenvolvimento",
      areaId: areaTech.id
    }
  })

  // Criar Cargos (Roles)
  const recruiterRole = await prisma.role.create({
    data: { name: "Recrutador(a)" }
  })

  const devRole = await prisma.role.create({
    data: { name: "Engenheiro(a) de Software Júnior" }
  })

  const hrManagerRole = await prisma.role.create({
    data: { name: "Gerente de RH" }
  })

  // Criar Usuários
  const user1 = await prisma.user.create({
    data: {
      name: "Alice Souza",
      email: "alice@email.com",
      password: hashedPassword,
      photo: "https://randomuser.me/api/portraits/women/1.jpg",
      birthdate: new Date("1992-05-14"),
      roleId: hrManagerRole.id,
      teamId: growthTeam.id
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: "Bruno Lima",
      email: "bruno@email.com",
      password: hashedPassword,
      photo: "https://randomuser.me/api/portraits/men/2.jpg",
      birthdate: new Date("1990-08-22"),
      roleId: recruiterRole.id,
      teamId: recruitmentTeam.id
    }
  })

  const user3 = await prisma.user.create({
    data: {
      name: "Carla Mendes",
      email: "carla@email.com",
      password: hashedPassword,
      photo: "https://randomuser.me/api/portraits/women/3.jpg",
      birthdate: new Date("1985-12-10"),
      roleId: devRole.id,
      teamId: devTeam.id
    }
  })

  // Criar Documentos
  const doc1 = await prisma.doc.create({
    data: {
      name: "Fluxo de Recrutamento",
      link: "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf"
    }
  })

  const doc2 = await prisma.doc.create({
    data: {
      name: "Guia de Entrevistas",
      link: "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf"
    }
  })

  // Criar Ferramentas
  const notion = await prisma.tool.create({
    data: {
      name: "Notion",
      link: "https://notion.so",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png"
    }
  })

  const trello = await prisma.tool.create({
    data: {
      name: "Trello",
      link: "https://trello.com",
      image: "https://cdn.iconscout.com/icon/free/png-256/free-trello-2-432549.png"
    }
  })

  const linkedin = await prisma.tool.create({
    data: {
      name: "LinkedIn",
      link: "https://www.linkedin.com",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
    }
  })

  const gupy = await prisma.tool.create({
    data: {
      name: "Gupy",
      link: "https://www.gupy.io/",
      image: "https://raichu-uploads.s3.amazonaws.com/logo_gupy_Fkctg7.png"
    }
  })

  // Criar Processos Principais
  const recruitmentProcess = await prisma.process.create({
    data: {
      title: "Recrutamento e Seleção",
      teamId: recruitmentTeam.id,
      manual: false,
      priority: "HIGH",
      processDocs: {
        create: { doc: { connect: { id: doc1.id } } }
      },
      processTools: {
        create: { tool: { connect: { id: trello.id } }, purpose: "Gestão de candidatos" }
      }
    }
  })

  // Criar Subprocessos para Recrutamento
  const profileDefinition = await prisma.process.create({
    data: {
      title: "Definição de perfil da vaga",
      teamId: recruitmentTeam.id,
      manual: false,
      priority: "MEDIUM",
      parentId: recruitmentProcess.id
    }
  })

  const jobPosting = await prisma.process.create({
    data: {
      title: "Divulgação da vaga",
      teamId: recruitmentTeam.id,
      manual: false,
      priority: "HIGH",
      parentId: recruitmentProcess.id
    }
  })

  const linkedinPosition = await prisma.process.create({
    data: {
      title: "Criar vaga no LinkedIn",
      teamId: recruitmentTeam.id,
      manual: false,
      priority: "MEDIUM",
      parentId: jobPosting.id,
      processTools: {
        create: { tool: { connect: { id: linkedin.id } }, purpose: "Divulgação da vaga" }
      }
    }
  })

  const gupyPosition = await prisma.process.create({
    data: {
      title: "Criar vaga na Gupy",
      teamId: recruitmentTeam.id,
      manual: false,
      priority: "LOW",
      parentId: jobPosting.id,
      processTools: {
        create: { tool: { connect: { id: gupy.id } }, purpose: "Divulgação da vaga" }
      }
    }
  })

  const resumeScreening = await prisma.process.create({
    data: {
      title: "Triagem de currículos",
      teamId: recruitmentTeam.id,
      manual: false,
      priority: "HIGH",
      parentId: recruitmentProcess.id
    }
  })

  const interviews = await prisma.process.create({
    data: {
      title: "Entrevistas",
      teamId: recruitmentTeam.id,
      manual: false,
      priority: "HIGH",
      parentId: recruitmentProcess.id,
      processDocs: {
        create: [{ doc: { connect: { id: doc2.id } } }]
      },
      processTools: {
        create: { tool: { connect: { id: notion.id } }, purpose: "Armazenar descrições das vagas" }
      }
    }
  })

  const jobOffer = await prisma.process.create({
    data: {
      title: "Oferta de contratação",
      teamId: recruitmentTeam.id,
      manual: true,
      priority: "HIGH",
      parentId: recruitmentProcess.id
    }
  })

  console.log("✅ Seed concluído!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
