import { City } from "@/api/domain/entities/City";
import { SingletonMongoDB } from "@/api/infrastructure/data-sources/typeorm";
import TypeORMCity from "@/api/infrastructure/data-sources/typeorm/models/mongo/City";

const mongoDB = SingletonMongoDB.getInstance();

async function getCityRepository() {
    const connection = await mongoDB;
    return connection.getDataSource().getRepository(TypeORMCity);
}

export async function GET() {
    const cityRepository = await getCityRepository();
    const city = await cityRepository.find();
    return Response.json({'City': city});
}

export async function POST(request: Request) {
    const cityRepository = await getCityRepository();
    const body = await request.json() as City;
    const city = await cityRepository.save(body);
    return Response.json({'City': city});
}