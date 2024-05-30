import Sede from "@/api/domain/entities/Sede";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TypeORMCiudad from "./Ciudad";

@Entity({ schema: "eventos" })
export default class TypeORMSede implements Sede {

    @PrimaryGeneratedColumn("increment")
    codigo!: number;

    @Column()
    nombre!: string;

    @ManyToOne(() => TypeORMCiudad, ciudad => ciudad.codigo)
    cod_ciudad!: number;
}