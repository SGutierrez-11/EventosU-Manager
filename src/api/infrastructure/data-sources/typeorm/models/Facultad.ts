import Facultad from "@/api/domain/entities/Facultad";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class TypeORMFacultad implements Facultad {

    @PrimaryGeneratedColumn("increment")
    codigo!: number;

    @Column()
    nombre!: string;

    @Column()
    ubicacion!: string;

    @Column()
    nro_telefono!: string;


    id_decano!: string;
}