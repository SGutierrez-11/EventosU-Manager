import Area from "@/api/domain/entities/Area"
import { SingletonPostgresDB } from "@/api/infrastructure/data-sources/typeorm"
import TypeORMArea from "@/api/infrastructure/data-sources/typeorm/models/postgres/Area"

const postgresDB = SingletonPostgresDB.getInstance()

async function getAreaRepository() {
    const connection = await postgresDB
    return connection.getDataSource().getRepository(TypeORMArea)
}

export async function GET() {
    const areaRepository = await getAreaRepository()
    const areas = await areaRepository.find()
    return Response.json({'Areas': areas})
}

export async function POST(request: Request) {
    const areaRepository = await getAreaRepository()
    const body = await request.json() as Area
    const area = await areaRepository.save(body)
    return Response.json({'Area': area})
}