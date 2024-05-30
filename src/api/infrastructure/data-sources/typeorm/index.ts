import { DataSource, DataSourceOptions } from "typeorm"
import TypeORMSede from "./models/postgres/Sede"
import TypeORMCiudad from "./models/postgres/Ciudad"
import TypeORMArea from "./models/postgres/Area"
import TypeORMDepartamento from "./models/postgres/Departamento"
import TypeORMEmpleado from "./models/postgres/Empleado"
import TypeORMFacultad from "./models/postgres/Facultad"
import TypeORMPais from "./models/postgres/Pais"
import TypeORMPrograma from "./models/postgres/Programa"
import TypeORMTipoContratacion from "./models/postgres/TipoContratacion"
import TypeORMTipoEmpleado from "./models/postgres/TipoEmpleado"
import TypeORMCity from "./models/mongo/City"
import TypeORMComment from "./models/mongo/Comment"
import TypeORMEvent from "./models/mongo/Event"
import TypeORMLocation from "./models/mongo/Location"
import TypeORMUser from "./models/mongo/User"

export class TypeORMDataSource {
    protected dataSource: DataSource

    constructor(options: DataSourceOptions) {
        this.dataSource = new DataSource(options)
    }

    async initialize() {
        try {
            await this.dataSource.initialize()
            console.log("Base de datos inicializada")
        } catch (error) {
            console.error(error)
        }
    }

    getDataSource() {
        return this.dataSource
    }
}

export class SingletonPostgresDB {
    private static instance: TypeORMDataSource
    private static options: DataSourceOptions = {
        type: "postgres",
        host: process.env.POSTGRES_HOST || "localhost",
        port: parseInt(process.env.POSTGRES_PORT || "5432"),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [TypeORMArea, TypeORMArea, TypeORMCiudad, TypeORMDepartamento, TypeORMEmpleado, TypeORMFacultad, TypeORMPais, TypeORMPrograma, TypeORMSede, TypeORMTipoContratacion, TypeORMTipoEmpleado],
        synchronize: true,
    }

    private constructor() {}

    static async getInstance() {
        if (!SingletonPostgresDB.instance) {
            SingletonPostgresDB.instance = new TypeORMDataSource(this.options)
            await SingletonPostgresDB.instance.initialize()
        }

        return SingletonPostgresDB.instance
    }
}

export class SingletonMongoDB {
    private static instance: TypeORMDataSource
    private static options: DataSourceOptions = {
        type: "mongodb",
        url: process.env.MONGO_URI || "mongodb://localhost:27017",
        useNewUrlParser: true, // Opciones específicas para MongoDB
        useUnifiedTopology: true,
        synchronize: true,
        entities: [TypeORMCity, TypeORMComment, TypeORMEvent, TypeORMLocation, TypeORMUser],
        logging: true,
    }

    private constructor() {}

    static async getInstance() {
        if (!SingletonMongoDB.instance) {
            SingletonMongoDB.instance = new TypeORMDataSource(this.options)
            await SingletonMongoDB.instance.initialize()
        }

        return SingletonMongoDB.instance
    }
}