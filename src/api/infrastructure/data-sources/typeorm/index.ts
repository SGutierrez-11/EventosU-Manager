import { DataSource, DataSourceOptions } from "typeorm"

export class TypeORMDataSource {
    protected dataSource: DataSource

    constructor(options: DataSourceOptions) {
        this.dataSource = new DataSource(options)
    }

    async initialize() {
        try {
            this.dataSource.initialize()
            console.log("Base de datos inicializada")
        } catch (error) {
            console.error(error)
        }
    }
}