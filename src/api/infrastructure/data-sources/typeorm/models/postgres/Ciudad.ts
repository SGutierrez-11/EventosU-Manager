import Ciudad from "@/api/domain/entities/Ciudad";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TypeORMDepartamento from "./Departamento";

@Entity({ schema: "eventos" })
export default class TypeORMCiudad implements Ciudad {

    @PrimaryGeneratedColumn("increment")
    codigo!: number;

    @Column()
    nombre!: string;

    @ManyToOne(() => TypeORMDepartamento, departamento => departamento.codigo)
    cod_dpto!: number;
}