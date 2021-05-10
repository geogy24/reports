import { LanguageLevelDto } from "./language-level.dto";
import { RoleDto } from "./role.dto";
import { StackDto } from "./stack.dto";

export interface JoinerDto {
    id: number;
    name: string;
    role: RoleDto;
    stack: StackDto;
    identification_number: string;
    last_name: string;
    domain_experience: string;
    language_level: LanguageLevelDto;
}
