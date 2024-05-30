import Empleado from "@/api/domain/entities/Empleado"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMEmpleado from "@/api/infrastructure/data-sources/typeorm/models/postgres/Empleado"

const postgresDB = SingletonPostgresDB.getInstance()

async function getEmpleadoRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMEmpleado)
}

export async function GET() {
    const empleadoRepository = await getEmpleadoRepository()
    const empleados = await empleadoRepository.find()
    return Response.json({'Empleados': empleados})
}

export async function POST(request: Request) {
    const empleadoRepository = await getEmpleadoRepository()
    const body = await request.json() as Empleado
    const empleado = await empleadoRepository.save(body)
    return Response.json({'Empleado': empleado})
}