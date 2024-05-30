import Departamento from "@/api/domain/entities/Departamento";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TypeORMPais from "./Pais";

@Entity({ schema: "eventos" })
export default class TypeORMDepartamento implements Departamento {

    @PrimaryGeneratedColumn("increment")
    codigo!: number;

    @Column()
    nombre!: string;

    @ManyToOne(() => TypeORMPais, pais => pais.codigo)
    cod_pais!: number;
}