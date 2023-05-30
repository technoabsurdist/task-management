import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Put, 
    Query,
    UseGuards} 
from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
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

        @Patch('/:id/status')
        updateTaskStatusById(
            @Param('id') id: string,
            @Body('') UpdateTaskStatusDto: UpdateTaskStatusDto 
        ): Promise<Task> {
            const { status } = UpdateTaskStatusDto
            return this.tasksService.updateTaskStatusById(id, status)
        }

        @Post()
        createTask(
            @Body() createTaskDto: CreateTaskDto,
            @GetUser() user: User
        ): Promise<Task> {
            return this.tasksService.createTask(createTaskDto, user)
        }
}
