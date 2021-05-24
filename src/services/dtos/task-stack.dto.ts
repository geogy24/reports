import { JoinerDto } from "src/facades/dtos/joiner.dto";

export class TaskStackDto {
    id: number;
    name: string;
    role: string;
    stack: string;
    identification_number: string;
    last_name: string;
    domain_experience: string;
    language_level: string;
    task_completed: number;
    
    static toPresentation(joinerDto: JoinerDto): TaskStackDto {
        const taskStackDto = new TaskStackDto();
        taskStackDto.id = joinerDto.id;
        taskStackDto.name = joinerDto.name;
        taskStackDto.role = joinerDto.role.name;
        taskStackDto.stack = joinerDto.stack.name;
        taskStackDto.identification_number = joinerDto.identification_number;
        taskStackDto.last_name = joinerDto.last_name;
        taskStackDto.domain_experience = joinerDto.domain_experience;
        taskStackDto.language_level = joinerDto.language_level.language;
        return taskStackDto;
    }
}
