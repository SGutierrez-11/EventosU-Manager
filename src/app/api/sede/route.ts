import Sede from "@/api/domain/entities/Sede";
import { SingletonPostgresDB } from "../../../api/infrastructure/data-sources/typeorm";
import TypeORMSede from "../../../api/infrastructure/data-sources/typeorm/models/postgres/Sede";

const postgresDB = SingletonPostgresDB.getInstance()

async function getSedeRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMSede)
}

export async function GET() {
    const sedeRepository = await getSedeRepository()
    const sedes = await sedeRepository.find()
    return Response.json({'Sedes': sedes})
}

export async function POST(request: Request) {
    const sedeRepository = await getSedeRepository()
    const body = await request.json() as Sede
    const sede = await sedeRepository.save(body)
    return Response.json({'Sede': sede})
}