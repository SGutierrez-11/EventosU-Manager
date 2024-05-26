import Programa from "@/api/domain/entities/Programa";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class TypeORMPrograma implements Programa {

    @PrimaryGeneratedColumn("increment")
    codigo!: number;

    @Column()
    nombre!: string;

    @Column()
    areas_codigo!: number;
}