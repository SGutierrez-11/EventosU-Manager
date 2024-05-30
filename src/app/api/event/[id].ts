// pages/api/eventos/[id].js
import { SingletonMongoDB } from "@/api/infrastructure/data-sources/typeorm";
import TypeORMEvent from "@/api/infrastructure/data-sources/typeorm/models/mongo/Event";

const mongoDB = SingletonMongoDB.getInstance();

async function getEventRepository() {
    const connection = await mongoDB;
    return connection.getDataSource().getMongoRepository(TypeORMEvent);
}

export default async function handler(req: { method: string; query: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; Event?: TypeORMEvent; error?: any; }): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query; // Next.js usa `query` para obtener los parámetros de ruta
            const eventRepository = await getEventRepository();
            const event = await eventRepository.findOneBy({ id: id });

            if (!event) {
                res.status(404).json({ message: "Event not found" });
                return;
            }

            res.status(200).json({ Event: event });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    } else {
        // Maneja otros métodos HTTP, si es necesario
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
