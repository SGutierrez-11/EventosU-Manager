import Programa from "@/api/domain/entities/Programa"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMPrograma from "@/api/infrastructure/data-sources/typeorm/models/postgres/Programa"

const postgresDB = SingletonPostgresDB.getInstance()

async function getProgramaRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMPrograma)
}

export async function GET() {
    const programaRepository = await getProgramaRepository()
    const programas = await programaRepository.find()
    return Response.json({'Programas': programas})
}

export async function POST(request: Request) {
    const programaRepository = await getProgramaRepository()
    const body = await request.json() as Programa
    const programa = await programaRepository.save(body)
    return Response.json({'Programa': programa})
}