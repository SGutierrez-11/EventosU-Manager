import { City } from "@/api/domain/entities/City";
import { Column, Entity, ObjectIdColumn } from "typeorm";


@Entity()
export default class TypeORMCity implements City {
    @ObjectIdColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    department!: string;

    @Column()
    country!: string;
}