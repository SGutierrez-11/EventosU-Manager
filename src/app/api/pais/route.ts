import Pais from "@/api/domain/entities/Pais"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMPais from "@/api/infrastructure/data-sources/typeorm/models/postgres/Pais"

const postgresDB = SingletonPostgresDB.getInstance()

async function getPaisRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMPais)
}

export async function GET() {
    const paisRepository = await getPaisRepository()
    const pais = await paisRepository.find()
    return Response.json({'Pais': pais})
}

export async function POST(request: Request) {
    const paisRepository = await getPaisRepository()
    const body = await request.json() as Pais
    const pais = await paisRepository.save(body)
    return Response.json({'Pais': pais})
}