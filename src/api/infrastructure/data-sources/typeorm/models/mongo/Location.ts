import { Location } from "@/api/domain/entities/Location";
import { Column } from "typeorm";
import TypeORMCity from "./City";



export default class TypeORMLocation implements Location {
    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column(() => TypeORMCity)
    city!: TypeORMCity;
}