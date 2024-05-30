import Facultad from "@/api/domain/entities/Facultad"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMFacultad from "@/api/infrastructure/data-sources/typeorm/models/postgres/Facultad"

const postgresDB = SingletonPostgresDB.getInstance()

async function getFacultadRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMFacultad)
}

export async function GET() {
    const facultadRepository = await getFacultadRepository()
    const facultades = await facultadRepository.find()
    console.log(facultades)
    return Response.json({'Facultades': facultades})
}

export async function POST(request: Request) {
    const facultadRepository = await getFacultadRepository()
    const body = await request.json() as Facultad
    const facultad = await facultadRepository.save(body)
    return Response.json({'Facultad': facultad})
}