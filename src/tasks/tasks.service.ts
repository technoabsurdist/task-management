import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto)
    }

    async getTaskById(id: string): Promise<Task> {
        // fetch task from db, error if not found, return if found
        const found = await this.tasksRepository.findOneBy({id: id})
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found
    }

    async deleteTaskById(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found.`)
        }
    }

    async updateTaskStatusById(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)

        task.status = status
        await this.tasksRepository.save(task)
        return task
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto)
    }
    
}
