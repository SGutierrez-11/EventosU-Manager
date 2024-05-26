import { ICommonUseCases } from "@/api/application/use-cases/common";
import Area from "@/api/domain/entities/Area";
import { DataSource, Repository } from "typeorm";
import TypeORMArea from "../models/Area";

export class TypeORMAreaRepository implements ICommonUseCases<Area> {
    protected areaRepository: Repository<TypeORMArea>;

    constructor(dataSource: DataSource) {
        this.areaRepository = dataSource.getRepository(TypeORMArea);
    }

    protected getWhereCondition(filter: Partial<Area>): Partial<Area> {
        const whereCondition: Partial<Area> = {};

        Object.keys(filter).forEach(key => {
            const safeKey = key as keyof Area;
            const value = filter[safeKey];

            if (value !== undefined && value !== null) {
                Object.assign(whereCondition, {[safeKey]: value});
            }
        });

        return whereCondition;
    }

    add(entity: Area) : Promise<Area> {
        return this.areaRepository.save(entity);
    }

    async update(filter: Partial<Area>, entity: Area) : Promise<Area> {
        const whereCondition = this.getWhereCondition(filter);
        await this.areaRepository.update(whereCondition, entity);
        return entity;
    }

    delete(filter: Partial<Area>) : any {
        const whereCondition = this.getWhereCondition(filter);
        return this.areaRepository.delete(whereCondition);
    }

    getOne(filter: Partial<Area>) : Promise<Area | null> {
        const whereCondition = this.getWhereCondition(filter);
        return this.areaRepository.findOne({where: whereCondition});
    }

    getAll() : Promise<Area[]> {
        return this.areaRepository.find();
    }
}