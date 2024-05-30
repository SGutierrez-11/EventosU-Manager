import Departamento from "@/api/domain/entities/Departamento"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMDepartamento from "@/api/infrastructure/data-sources/typeorm/models/postgres/Departamento"

const postgresDB = SingletonPostgresDB.getInstance()

async function getDepartamentoRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMDepartamento)
}

export async function GET() {
    const departamentoRepository = await getDepartamentoRepository()
    const departamento = await departamentoRepository.find()
    return Response.json({'Departamentos': departamento})
}

export async function POST(request: Request) {
    const departamentoRepository = await getDepartamentoRepository()
    const body = await request.json() as Departamento
    const departamento = await departamentoRepository.save(body)
    return Response.json({'Departamento': departamento})
}