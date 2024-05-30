import { City } from "@/api/domain/entities/City";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";


@Entity()
export default class TypeORMCity{
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    name!: string;

    @Column()
    department!: string;

    @Column()
    country!: string;
}