import { User, UserRelation } from "@/api/domain/entities/User";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import TypeORMCity from "./City";
import { ObjectId } from "mongodb";

@Entity()
export default class TypeORMUser {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    username!: string;

    @Column()
    fullName!: string;

    @Column({ type: "enum", enum: UserRelation})
    relationshipType!: UserRelation;

    @Column()
    email!: string;

    @Column(() => TypeORMCity)
    city!: TypeORMCity;
}