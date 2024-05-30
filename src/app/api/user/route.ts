import { User } from "@/api/domain/entities/User";
import { SingletonMongoDB } from "@/api/infrastructure/data-sources/typeorm";
import TypeORMUser from "@/api/infrastructure/data-sources/typeorm/models/mongo/User";

const mongoDB = SingletonMongoDB.getInstance();

async function getUserRepository() {
    const connection = await mongoDB;
    return connection.getDataSource().getMongoRepository(TypeORMUser);
}

export async function GET() {
    const userRepository = await getUserRepository();
    const user = await userRepository.find();
    console.log(user);
    return Response.json({'User': user});
}

export async function POST(request: Request) {
    const userRepository = await getUserRepository();
    const body = await request.json() as User;
    const user = await userRepository.save(body);
    return Response.json({'User': user});
}