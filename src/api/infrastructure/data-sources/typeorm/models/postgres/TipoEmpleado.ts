import TipoEmpleado from "@/api/domain/entities/TipoEmpleado";
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "eventos" })
export default class TypeORMTipoEmpleado implements TipoEmpleado {

    @PrimaryColumn("varchar")
    nombre!: string;
}