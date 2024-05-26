import { ICommonUseCases } from "@/api/domain/use-cases/common";
import { EntityMetadata, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity.js";

export class TypeORMGenericRepository<T extends EntityMetadata> implements ICommonUseCases<T> {
    protected repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    protected getWhereCondition(filter: Partial<T>): FindOptionsWhere<T> {
        const whereCondition: FindOptionsWhere<T> = {};

        Object.keys(filter).forEach(key => {
            const safeKey = key as keyof T;
            const value = filter[safeKey];

            if (value !== undefined && value !== null) {
                Object.assign(whereCondition, {[safeKey]: value});
            }
        });

        return whereCondition;
    }

    add(entity: T) : Promise<T> {
        return this.repository.save(entity);
    }

    async update(filter: Partial<T>, entity: T) : Promise<T> {
        const whereCondition = this.getWhereCondition(filter);
        await this.repository.update(whereCondition, entity as QueryDeepPartialEntity<T>);
        return entity;
    }

    delete(filter: Partial<T>) : any {
        const whereCondition = this.getWhereCondition(filter);
        return this.repository.delete(whereCondition);
    }

    getOne(filter: Partial<T>) : Promise<T | null> {
        const whereCondition = this.getWhereCondition(filter);
        return this.repository.findOne({where: whereCondition});
    }

    getAll() : Promise<T[]> {
        return this.repository.find();
    }
}