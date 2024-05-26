import Pais from "@/api/domain/entities/Pais";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class TypeORMPais implements Pais {

    @PrimaryGeneratedColumn("increment")
    codigo!: number;

    @Column()
    nombre!: string;
}