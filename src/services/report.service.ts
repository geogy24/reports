import { Injectable } from '@nestjs/common';
import { JoinerDto } from 'src/facades/dtos/joiner.dto';
import { TaskStackDto } from 'src/facades/dtos/task-stack.dto';
import { JoinerFacade } from 'src/facades/joiner.facade';
import { TaskFacade } from 'src/facades/task.facade';
import { TaskStackDto as TaskStackService } from './dtos/task-stack.dto';
import { TaskDayDto as TaskDayService } from './dtos/task-day.dto';

import { v4 as uuidv4 } from 'uuid';
import { TaskDayDto } from 'src/facades/dtos/task-day';
const ObjectsToCsv = require('objects-to-csv');

@Injectable()
export class ReportService {
  private TASK_STACK_KEY: string = 'task_stack';
  private TASK_DAY_KEY: string = 'task_day';

  constructor(private taskFacade: TaskFacade, private joinerFacade: JoinerFacade) {}

  async tasksFilteredByStackGroupedByJoinerAndCompleteTask(stackId: number): Promise<string> {
    let tasks: Array<TaskStackDto> = await this.taskFacade.tasksFilteredByStackGroupedByJoinerAndCompleteTask(stackId);
    const joinerIds = tasks.map((task: TaskStackDto) => task.joiner_id);
    const joiners: Array<JoinerDto> = await this.joinerFacade.getJoiners(joinerIds);
    
    const taskStacksService: Array<TaskStackService> = joiners.map((joiner: JoinerDto) => {
      const taskStackService: TaskStackService = TaskStackService.toPresentation(joiner);
      const task = tasks.find(task => task.joiner_id === taskStackService.id );
      taskStackService.task_completed = task.completed;
      return taskStackService;
    })

    return this.saveToCsvFile(this.TASK_STACK_KEY, taskStacksService);
  }

  async daysLeftToCompleteTaskByJoiner(): Promise<string> {
    let tasks: Array<TaskDayDto> = await this.taskFacade.daysLeftToCompleteTaskByJoiner();
    const joinerIds = tasks.map((task: TaskDayDto) => task.joiner_id);
    const joiners: Array<JoinerDto> = await this.joinerFacade.getJoiners(joinerIds);
    
    const taskDaysService: Array<TaskDayService> = joiners.map((joiner: JoinerDto) => {
      const taskDayService: TaskDayService = TaskDayService.toPresentation(joiner);
      const task = tasks.find(task => task.joiner_id === taskDayService.id );
      taskDayService.days_left = task.days_left;
      return taskDayService;
    })

    return this.saveToCsvFile(this.TASK_DAY_KEY, taskDaysService);
  }

  private async saveToCsvFile(name: string, data: any): Promise<string> {
    const fileName = `${name}-${uuidv4()}`;
    await (new ObjectsToCsv(data)).toDisk(`./files/${fileName}.csv`);
    return fileName;
  }
}
