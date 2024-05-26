import Facultad from "@/api/domain/entities/Facultad";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import TypeORMEmpleado from "./Empleado";

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

    @OneToOne(() => TypeORMEmpleado, empleado => empleado.identificacion)
    id_decano!: string;
}