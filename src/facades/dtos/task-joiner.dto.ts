export interface TaskJoinerDto {
    name: string;
    id: number;
    stack: number;
    description: string;
    joiner_id: number;
    roles: string;
    parent_task: number | null;
    worked_hours: number;
    estimated_required_hours: number;
}