import { Location } from "@/api/domain/entities/Location";
import { Column, Entity } from "typeorm";
import TypeORMCity from "./City";

@Entity()
export default class TypeORMLocation implements Location {
    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column(() => TypeORMCity)
    city!: TypeORMCity;
}