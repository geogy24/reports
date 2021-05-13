import { JoinerDto } from "src/facades/dtos/joiner.dto";

export class TaskDayDto {
    id: number;
    name: string;
    role: string;
    stack: string;
    identification_number: string;
    last_name: string;
    domain_experience: string;
    language_level: string;
    days_left: number;
    
    static toPresentation(joinerDto: JoinerDto): TaskDayDto {
        const taskDayDto = new TaskDayDto();
        taskDayDto.id = joinerDto.id;
        taskDayDto.name = joinerDto.name;
        taskDayDto.role = joinerDto.role.name;
        taskDayDto.stack = joinerDto.stack.name;
        taskDayDto.identification_number = joinerDto.identification_number;
        taskDayDto.last_name = joinerDto.last_name;
        taskDayDto.domain_experience = joinerDto.domain_experience;
        taskDayDto.language_level = joinerDto.language_level.language;
        return taskDayDto;
    }
}
