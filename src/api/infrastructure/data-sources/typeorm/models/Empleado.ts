import Empleado from "@/api/domain/entities/Empleado";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import TypeORMTipoContratacion from "./TipoContratacion";
import TypeORMTipoEmpleado from "./TipoEmpleado";
import TypeORMFacultad from "./Facultad";

@Entity()
export default class TypeORMEmpleado implements Empleado {

    @PrimaryColumn("string")
    identificacion!: string;

    @Column()
    nombres!: string;

    @Column()
    apellidos!: string;

    @Column()
    email!: string;

    @ManyToOne(() => TypeORMTipoContratacion, tipo_contratacion => tipo_contratacion.nombre)
    tipo_contratacion!: string;

    @ManyToOne(() => TypeORMTipoEmpleado, tipo_empleado => tipo_empleado.nombre)
    tipo_empleado!: string;

    @ManyToOne(() => TypeORMFacultad, facultad => facultad.codigo)
    cod_facultad!: number;


    codigo_sede!: number;


    lugar_nacimiento!: number;
}