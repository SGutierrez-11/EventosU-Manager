import { Comment } from "@/api/domain/entities/Comment";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import TypeORMUser from "./User";


@Entity()
export default class TypeORMComment implements Comment {
    @ObjectIdColumn()
    id!: string;

    @Column()
    text!: string;

    @Column(() => TypeORMUser)
    user!: TypeORMUser;
}