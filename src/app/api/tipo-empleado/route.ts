import TipoEmpleado from "@/api/domain/entities/TipoEmpleado"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMTipoEmpleado from "@/api/infrastructure/data-sources/typeorm/models/postgres/TipoEmpleado"

const postgresDB = SingletonPostgresDB.getInstance()

async function getTipoEmpleadoRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMTipoEmpleado)
}

export async function GET() {
    const tipoEmpleadoRepository = await getTipoEmpleadoRepository()
    const tipoEmpleado = await tipoEmpleadoRepository.find()
    return Response.json({'TipoEmpleado': tipoEmpleado})
}

export async function POST(request: Request) {
    const tipoEmpleadoRepository = await getTipoEmpleadoRepository()
    const body = await request.json() as TipoEmpleado
    const tipoEmpleado = await tipoEmpleadoRepository.save(body)
    return Response.json({'TipoEmpleado': tipoEmpleado})
}