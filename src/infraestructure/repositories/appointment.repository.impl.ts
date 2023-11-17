import { AppointmentDataSource, AppointmentEntity, AppointmentRepository, CreateAppointmentDto, PaginationDto } from "../../domain";

export class AppointmentRepositoryImpl implements AppointmentRepository {

    constructor( private readonly datasource: AppointmentDataSource ){}

    findOneById(id: string): Promise<AppointmentEntity> {
        return this.datasource.findOneById(id);
    }
    findMany(dto: PaginationDto): Promise<AppointmentEntity[]> {
        return this.datasource.findMany(dto);
    }
    create(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
        return this.datasource.create(dto);
    }
    update(dto: any): Promise<AppointmentEntity> {
        return this.datasource.update(dto);
    }
    delete(id: string): Promise<AppointmentEntity> {
        return this.datasource.delete(id);
    }

}