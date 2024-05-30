import Ciudad from "@/api/domain/entities/Ciudad"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMCiudad from "@/api/infrastructure/data-sources/typeorm/models/postgres/Ciudad"

const postgresDB = SingletonPostgresDB.getInstance()

async function getCiudadRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMCiudad)
}

export async function GET() {
    const ciudadRepository = await getCiudadRepository()
    const ciudades = await ciudadRepository.find()
    return Response.json({'Ciudades': ciudades})
}

export async function POST(request: Request) {
    const ciudadRepository = await getCiudadRepository()
    const body = await request.json() as Ciudad
    const ciudad = await ciudadRepository.save(body)
    return Response.json({'Ciudad': ciudad})
}