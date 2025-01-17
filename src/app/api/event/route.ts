import { Event } from "@/api/domain/entities/Event";
import { SingletonMongoDB } from "@/api/infrastructure/data-sources/typeorm";
import TypeORMEvent from "@/api/infrastructure/data-sources/typeorm/models/mongo/Event";
import { ObjectId } from "mongodb";

const mongoDB = SingletonMongoDB.getInstance();

async function getEventRepository() {
    const connection = await mongoDB;
    return connection.getDataSource().getMongoRepository(TypeORMEvent);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
        const eventRepository = await getEventRepository();
        const objectId = new ObjectId(id);
        const events = await eventRepository.find();
        const event = events.find((event: any) => { console.log(event);return event.id.equals(objectId)});
        return Response.json({'Event': event});
    } else {
        const eventRepository = await getEventRepository();
        const event = await eventRepository.find();
        return Response.json({'Event': event});
    }
}

export async function POST(request: Request) {
    const eventRepository = await getEventRepository();
    const body = await request.json() as Event;
    const event = await eventRepository.save(body);
    return Response.json({'Event': event});
}

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const eventRepository = await getEventRepository();
    const body = await request.json() as Event;
    const event = await eventRepository.update(id as string, body);
    return Response.json({'Event': event});
}

export async function UPDATE(request: Request) {
    const eventRepository = await getEventRepository();
    const body = await request.json() as Event;
    const event = await eventRepository.save(body);
    return Response.json({'Event': event});
}