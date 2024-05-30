import { Location } from "@/api/domain/entities/Location";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import TypeORMCity from "./City";
import { ObjectId } from "mongodb";


@Entity()
export default class TypeORMLocation {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column(() => TypeORMCity)
    city!: TypeORMCity;
}