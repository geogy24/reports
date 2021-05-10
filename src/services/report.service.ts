import { Injectable } from '@nestjs/common';
import { JoinerDto } from 'src/facades/dtos/joiner.dto';
import { TaskStackDto } from 'src/facades/dtos/task-stack.dto';
import { JoinerFacade } from 'src/facades/joiner.facade';
import { TaskFacade } from 'src/facades/task.facade';
import { TaskStackDto as TaskStackService } from './dtos/task-stack.dto';

import { v4 as uuidv4 } from 'uuid';
const ObjectsToCsv = require('objects-to-csv');

@Injectable()
export class ReportService {
  private TASK_STACK_KEY: string = 'task_stack';

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

  private async saveToCsvFile(name: string, data: any): Promise<string> {
    const fileName = `${name}-${uuidv4()}`;
    await (new ObjectsToCsv(data)).toDisk(`./files/${fileName}.csv`);
    return fileName;
  }
}
