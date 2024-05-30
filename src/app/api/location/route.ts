import { Location } from "@/api/domain/entities/Location";
import { SingletonMongoDB } from "@/api/infrastructure/data-sources/typeorm";
import TypeORMLocation from "@/api/infrastructure/data-sources/typeorm/models/mongo/Location";

const mongoDB = SingletonMongoDB.getInstance();

async function getLocationRepository() {
    const connection = await mongoDB;
    return connection.getDataSource().getRepository(TypeORMLocation);
}

export async function GET() {
    const locationRepository = await getLocationRepository();
    const location = await locationRepository.find();
    return Response.json({'Location': location});
}

export async function POST(request: Request) {
    const locationRepository = await getLocationRepository();
    const body = await request.json() as Location;
    const location = await locationRepository.save(body);
    return Response.json({'Location': location});
}
