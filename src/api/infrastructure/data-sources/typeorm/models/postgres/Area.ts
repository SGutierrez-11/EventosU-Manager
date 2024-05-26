import Area from "@/api/domain/entities/Area";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import TypeORMFacultad from "./Facultad";
import TypeORMEmpleado from "./Empleado";

@Entity()
export default class TypeORMArea implements Area {
    @PrimaryGeneratedColumn("increment")
    codigo!: number;

    @Column()
    nombre!: string;

    @ManyToOne(() => TypeORMFacultad, facultad => facultad.codigo)
    facultades_codigo!: number;

    @OneToOne(() => TypeORMEmpleado, empleado => empleado.identificacion)
    id_coordinador!: string;
}