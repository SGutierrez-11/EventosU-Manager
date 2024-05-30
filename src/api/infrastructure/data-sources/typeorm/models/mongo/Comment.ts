import { Comment } from "@/api/domain/entities/Comment";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import TypeORMUser from "./User";
import { ObjectId } from "mongodb";


@Entity()
export default class TypeORMComment {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    text!: string;

    @Column(() => TypeORMUser)
    user!: TypeORMUser;
}