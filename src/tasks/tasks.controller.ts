import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Put, 
    Query} 
from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto)
    }

        @Get('/:id')
        getTaskById(@Param('id') id: string): Promise<Task> {
           return this.tasksService.getTaskById(id) 
        }


        @Delete('/:id')
        deleteTaskById(@Param('id') id: string): Promise<void> {
            return this.tasksService.deleteTaskById(id)
        }

//     @Delete('/:id')
//     deleteTaskById(@Param('id') id: string): void {
//         return this.tasksService.deleteTaskById(id)
//     }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id') id: string,
        @Body('') UpdateTaskStatusDto: UpdateTaskStatusDto 
    ): Promise<Task> {
        const { status } = UpdateTaskStatusDto
        return this.tasksService.updateTaskStatusById(id, status)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }
}
