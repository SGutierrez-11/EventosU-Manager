import { Comment } from "@/api/domain/entities/Comment";
import { SingletonMongoDB } from "@/api/infrastructure/data-sources/typeorm";
import TypeORMComment from "@/api/infrastructure/data-sources/typeorm/models/mongo/Comment";

const mongoDB = SingletonMongoDB.getInstance();

async function getCommentRepository() {
    const connection = await mongoDB;
    return connection.getDataSource().getMongoRepository(TypeORMComment);
}

export async function GET() {
    const commentRepository = await getCommentRepository();
    const comment = await commentRepository.find();
    return Response.json({'Comment': comment});
}

export async function POST(request: Request) {
    const commentRepository = await getCommentRepository();
    const body = await request.json() as Comment;
    const comment = await commentRepository.save(body);
    return Response.json({'Comment': comment});
}