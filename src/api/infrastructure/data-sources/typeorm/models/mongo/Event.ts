import { Column, Entity, ObjectIdColumn } from "typeorm";
import TypeORMUser from "./User";
import { Event } from "@/api/domain/entities/Event";
import { User } from "@/api/domain/entities/User";
import TypeORMComment from "./Comment";
import TypeORMLocation from "./Location";
import { ObjectId } from "mongodb";


@Entity()
export default class TypeORMEvent {
    @ObjectIdColumn()
    id!: ObjectId;

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