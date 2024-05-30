import TipoContratacion from "@/api/domain/entities/TipoContratacion";
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "eventos" })
export default class TypeORMTipoContratacion implements TipoContratacion {

    @PrimaryColumn("varchar")
    nombre!: string;
}