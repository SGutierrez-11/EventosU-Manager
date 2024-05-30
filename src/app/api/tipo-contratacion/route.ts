import TipoContratacion from "@/api/domain/entities/TipoContratacion"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMTipoContratacion from "@/api/infrastructure/data-sources/typeorm/models/postgres/TipoContratacion"

const postgresDB = SingletonPostgresDB.getInstance()

async function getTipoContratacionRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMTipoContratacion)
}

export async function GET() {
    const tipoContratacionRepository = await getTipoContratacionRepository()
    const tipoContrataciones = await tipoContratacionRepository.find()
    return Response.json({'TipoContrataciones': tipoContrataciones})
}

export async function POST(request: Request) {
    const tipoContratacionRepository = await getTipoContratacionRepository()
    const body = await request.json() as TipoContratacion
    const tipoContratacion = await tipoContratacionRepository.save(body)
    return Response.json({'TipoContratacion': tipoContratacion})
}