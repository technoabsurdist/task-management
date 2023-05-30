import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTasksFilterDto {
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    search?: string; 
}