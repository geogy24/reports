import { HttpService, Injectable } from '@nestjs/common';
import { TaskDayDto } from './dtos/task-day.dto';
import { TaskJoinerDto } from './dtos/task-joiner.dto';
import { TaskStackDto } from './dtos/task-stack.dto';

@Injectable()
export class TaskFacade {
  private TASK_HOST: string = 'http://localhost:8081';

  constructor(private httpService: HttpService) {}

  async tasksFilteredByStackGroupedByJoinerAndCompleteTask(stackId: number): Promise<Array<TaskStackDto>> {
    return this.httpService.get(`${this.TASK_HOST}/api/reports/stacks?stack_id=${stackId}`)
      .toPromise()
      .then(response => response.data);
  }

  async taskCompletedAndUncompletedByJoiner(): Promise<Array<TaskJoinerDto>> {
    return this.httpService.get(`${this.TASK_HOST}/api/reports/tasks`)
      .toPromise()
      .then(response => response.data);
  }

  async daysLeftToCompleteTaskByJoiner(): Promise<Array<TaskDayDto>> {
    return this.httpService.get(`${this.TASK_HOST}/api/reports/days`)
      .toPromise()
      .then(response => response.data);
  }
}
