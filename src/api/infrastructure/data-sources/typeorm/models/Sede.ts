import Sede from "@/api/domain/entities/Sede";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class TypeORMSede implements Sede {

    @PrimaryGeneratedColumn("increment")
    codigo!: number;

    @Column()
    nombre!: string;

    
    cod_ciudad!: number;
}