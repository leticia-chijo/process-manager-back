import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // await prisma.$transaction([
  //   prisma.process.deleteMany(),
  //   prisma.doc.deleteMany(),
  //   prisma.tool.deleteMany(),
  //   prisma.team.deleteMany(),
  //   prisma.area.deleteMany()
  // ])

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

  // Criar Processos Recrutamento
  const recruitmentProcess = await prisma.process.create({
    data: {
      name: "Recrutamento e Seleção",
      teamId: recruitmentTeam.id,
      priority: "HIGH",
      processDocs: {
        create: { doc: { connect: { id: doc1.id } } }
      },
      processTools: {
        create: { tool: { connect: { id: trello.id } }, purpose: "Gestão de candidatos" }
      }
    }
  })

  const profileDefinition = await prisma.process.create({
    data: {
      name: "Definição de perfil da vaga",
      teamId: recruitmentTeam.id,
      priority: "MEDIUM",
      parentId: recruitmentProcess.id
    }
  })

  const jobPosting = await prisma.process.create({
    data: {
      name: "Divulgação da vaga",
      teamId: recruitmentTeam.id,
      priority: "HIGH",
      parentId: recruitmentProcess.id
    }
  })

  const linkedinPosition = await prisma.process.create({
    data: {
      name: "Criar vaga no LinkedIn",
      teamId: recruitmentTeam.id,
      priority: "MEDIUM",
      parentId: jobPosting.id,
      processTools: {
        create: { tool: { connect: { id: linkedin.id } }, purpose: "Divulgação da vaga" }
      }
    }
  })

  const gupyPosition = await prisma.process.create({
    data: {
      name: "Criar vaga na Gupy",
      teamId: recruitmentTeam.id,
      priority: "LOW",
      parentId: jobPosting.id,
      processTools: {
        create: { tool: { connect: { id: gupy.id } }, purpose: "Divulgação da vaga" }
      }
    }
  })

  const resumeScreening = await prisma.process.create({
    data: {
      name: "Triagem de currículos",
      teamId: recruitmentTeam.id,
      priority: "HIGH",
      parentId: recruitmentProcess.id
    }
  })

  const resumeDownload = await prisma.process.create({
    data: {
      name: "Baixar Arquivos",
      teamId: recruitmentTeam.id,
      priority: "MEDIUM",
      parentId: resumeScreening.id
    }
  })

  const interviews = await prisma.process.create({
    data: {
      name: "Entrevistas",
      teamId: recruitmentTeam.id,
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
      name: "Oferta de contratação",
      teamId: recruitmentTeam.id,
      priority: "HIGH",
      parentId: recruitmentProcess.id
    }
  })

  // Criar Processos desenvolvimento
  const devProcess = await prisma.process.create({
    data: {
      name: "Desenvolvimento de Software",
      teamId: devTeam.id,
      priority: "HIGH"
    }
  })

  const frontendDevelopment = await prisma.process.create({
    data: {
      name: "Desenvolvimento Frontend",
      teamId: devTeam.id,
      priority: "HIGH",
      parentId: devProcess.id
    }
  })

  const backendDevelopment = await prisma.process.create({
    data: {
      name: "Desenvolvimento Backend",
      teamId: devTeam.id,
      priority: "HIGH",
      parentId: devProcess.id
    }
  })

  const testing = await prisma.process.create({
    data: {
      name: "Testes e QA",
      teamId: devTeam.id,
      priority: "MEDIUM",
      parentId: devProcess.id
    }
  })

  const frontendArchitecture = await prisma.process.create({
    data: {
      name: "Arquitetura Frontend",
      teamId: devTeam.id,
      priority: "MEDIUM",
      parentId: frontendDevelopment.id
    }
  })

  const backendArchitecture = await prisma.process.create({
    data: {
      name: "Arquitetura Backend",
      teamId: devTeam.id,
      priority: "MEDIUM",
      parentId: backendDevelopment.id
    }
  })

  const componentLibrary = await prisma.process.create({
    data: {
      name: "Manutenção da Biblioteca de Componentes",
      teamId: devTeam.id,
      priority: "LOW",
      parentId: frontendArchitecture.id
    }
  })

  const frontendRefactor = await prisma.process.create({
    data: {
      name: "Refatoração de Código Frontend",
      teamId: devTeam.id,
      priority: "LOW",
      parentId: frontendArchitecture.id
    }
  })

  const codeReview = await prisma.process.create({
    data: {
      name: "Revisão de Código",
      teamId: devTeam.id,
      priority: "HIGH",
      parentId: frontendRefactor.id
    }
  })

  console.log("✅ Seed finished!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
