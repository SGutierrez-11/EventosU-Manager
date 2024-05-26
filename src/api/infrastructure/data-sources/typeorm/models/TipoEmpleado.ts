import TipoEmpleado from "@/api/domain/entities/TipoEmpleado";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class TypeORMTipoEmpleado implements TipoEmpleado {

    @PrimaryColumn("string")
    nombre!: string;
}