import { Event } from "@/api/domain/entities/Event";
import { SingletonMongoDB } from "@/api/infrastructure/data-sources/typeorm";
import TypeORMEvent from "@/api/infrastructure/data-sources/typeorm/models/mongo/Event";

const mongoDB = SingletonMongoDB.getInstance();

async function getEventRepository() {
    const connection = await mongoDB;
    return connection.getDataSource().getMongoRepository(TypeORMEvent);
}

export async function GET() {
    const eventRepository = await getEventRepository();
    const event = await eventRepository.find();
    console.log(event);
    return Response.json({'Event': event});
}

export async function POST(request: Request) {
    const eventRepository = await getEventRepository();
    const body = await request.json() as Event;
    const event = await eventRepository.save(body);
    return Response.json({'Event': event});
}

export async function PUT(request: Request) {
    const eventRepository = await getEventRepository();
    const body = await request.json() as Event;
    const event = await eventRepository.save(body);
    return Response.json({'Event': event});
}