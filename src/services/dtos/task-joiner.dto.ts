import { JoinerDto } from 'src/facades/dtos/joiner.dto';
import { RoleDto } from 'src/facades/dtos/role.dto';
import { StackDto } from 'src/facades/dtos/stack.dto';
import { TaskJoinerDto as TaskJoinerFacade } from 'src/facades/dtos/task-joiner.dto';

export class TaskJoinerDto {
    joiner_id: number;
    joiner_name: string;
    role: string;
    joiner_stack: string;
    identification_number: string;
    last_name: string;
    domain_experience: string;
    language_level: string;

    task_name: string;
    task_id: number;
    task_stack_id: number;
    task_stack: string;
    description: string;
    task_roles_ids: string;
    task_roles: string;
    parent_task: number | null;
    worked_hours: number;
    estimated_required_hours: number;

    task_completed: string;
    
    static toPresentation(taskJoinerFacade: TaskJoinerFacade): TaskJoinerDto {
        const taskJoinerDto = new TaskJoinerDto();
        taskJoinerDto.task_name = taskJoinerFacade.name;
        taskJoinerDto.task_id = taskJoinerFacade.id;
        taskJoinerDto.task_stack_id = taskJoinerFacade.stack;
        taskJoinerDto.description = taskJoinerFacade.description;
        taskJoinerDto.joiner_id = taskJoinerFacade.joiner_id;
        taskJoinerDto.task_roles_ids = taskJoinerFacade.roles;
        taskJoinerDto.parent_task = taskJoinerFacade.parent_task;
        taskJoinerDto.worked_hours = taskJoinerFacade.worked_hours;
        taskJoinerDto.estimated_required_hours = taskJoinerFacade.estimated_required_hours;
        taskJoinerDto.task_completed = (taskJoinerFacade.worked_hours >= taskJoinerFacade.estimated_required_hours).toString()
        return taskJoinerDto;
    }

    addJoinerData(joinerDto: JoinerDto): void {
        this.joiner_id = joinerDto.id;
        this.joiner_name = joinerDto.name;
        this.role = joinerDto.role.name;
        this.joiner_stack = joinerDto.stack.name;
        this.identification_number = joinerDto.identification_number;
        this.last_name = joinerDto.last_name;
        this.domain_experience = joinerDto.domain_experience;
        this.language_level = joinerDto.language_level.language;
    }

    addStackData(stackDto: StackDto): void {
        this.task_stack = stackDto.name;
    }

    addRoleData(roles: string): void {
        this.task_roles = roles;
    }
}
