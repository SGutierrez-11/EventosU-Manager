import { Column, Entity, ObjectIdColumn } from "typeorm";
import TypeORMUser from "./User";
import { Event } from "@/api/domain/entities/Event";
import { User } from "@/api/domain/entities/User";
import TypeORMComment from "./Commnet";
import TypeORMLocation from "./Location";


@Entity()
export default class TypeORMEvent implements Event {
    @ObjectIdColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column('array')
    categories!: string[];

    @Column()
    date!: string

    @Column()
    location!: TypeORMLocation;

    @Column(() => TypeORMUser)
    attendees!: TypeORMUser[];

    @Column(() => TypeORMUser)
    speakers!: User[];

    @Column('array')
    organizingFaculties!: string[];

    @Column()
    organizingProgram!: string;

    @Column(() => TypeORMComment)
    comments!: TypeORMComment[];
}