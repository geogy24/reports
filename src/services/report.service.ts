import { Injectable } from '@nestjs/common';
import { JoinerDto } from 'src/facades/dtos/joiner.dto';
import { TaskStackDto } from 'src/facades/dtos/task-stack.dto';
import { JoinerFacade } from 'src/facades/joiner.facade';
import { TaskFacade } from 'src/facades/task.facade';
import { TaskStackDto as TaskStackService } from './dtos/task-stack.dto';
import { TaskDayDto as TaskDayService } from './dtos/task-day.dto';
import { TaskJoinerDto as TaskJoinerService } from './dtos/task-joiner.dto';

import { v4 as uuidv4 } from 'uuid';
import { TaskDayDto } from 'src/facades/dtos/task-day.dto';
import { TaskJoinerDto } from 'src/facades/dtos/task-joiner.dto';
import { StackDto } from 'src/facades/dtos/stack.dto';
import { RoleDto } from 'src/facades/dtos/role.dto';

const ObjectsToCsv = require('objects-to-csv');

@Injectable()
export class ReportService {
  private static TASK_STACK_KEY: string = 'task_stack';
  private static TASK_DAY_KEY: string = 'task_day';
  private static TASKS_JOINER_KEY: string = 'tasks_joiner';

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

    return this.saveToCsvFile(ReportService.TASK_STACK_KEY, taskStacksService);
  }

  async taskCompletedAndUncompletedByJoiner(): Promise<string> {
    let tasks: Array<TaskJoinerDto> = await this.taskFacade.taskCompletedAndUncompletedByJoiner();
    let tasksJoinerService = await this.fillPresentationData(tasks);

    return this.saveToCsvFile(ReportService.TASKS_JOINER_KEY, tasksJoinerService);
  }

  private async fillPresentationData(tasks: Array<TaskJoinerDto>): Promise<Array<TaskJoinerService>> {
    const joinerIds = tasks.map((task: TaskJoinerDto) => task.joiner_id);
    const stackIds = tasks.map((task: TaskJoinerDto) => task.stack);
    const roleIds = tasks.flatMap((task: TaskJoinerDto) => task.roles.split(","))
                            .filter((v, i, a) => a.indexOf(v) === i)
                            .map(x => parseInt(x));

    const joiners: Array<JoinerDto> = await this.joinerFacade.getJoiners(joinerIds);
    const stacks: Array<StackDto> = await this.joinerFacade.getStacks(stackIds);
    const roles: Array<RoleDto> = await this.joinerFacade.getRoles(roleIds);
    
    const tasksJoinerService: Array<TaskJoinerService> = tasks.map((task: TaskJoinerDto) => {
      let taskJoinerService = TaskJoinerService.toPresentation(task);

      let joiner = joiners.find(joiner => joiner.id == taskJoinerService.joiner_id);
      taskJoinerService.addJoinerData(joiner);

      let stack = stacks.find(stack => stack.id == taskJoinerService.task_stack_id);
      taskJoinerService.addStackData(stack);

      let taskRoleIds: string[] = taskJoinerService.task_roles_ids.split(",")
      let roleNames = taskRoleIds.map(taskRoleId => {
        const roleFound = roles.find(role => parseInt(taskRoleId) === role.id);
        return roleFound ? roleFound.name : "";
      }).join("-");
      taskJoinerService.addRoleData(roleNames);

      return taskJoinerService;
    });

    return tasksJoinerService;
  }

  async taskCompletedAndUncompletedFilterByJoiner(joinerId: number): Promise<string> {
    let tasks: Array<TaskJoinerDto> = await this.taskFacade.taskCompletedAndUncompletedFilterByJoiner(joinerId);
    let tasksJoinerService = await this.fillPresentationData(tasks);

    return this.saveToCsvFile(ReportService.TASKS_JOINER_KEY, tasksJoinerService);
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

    return this.saveToCsvFile(ReportService.TASK_DAY_KEY, taskDaysService);
  }

  private async saveToCsvFile(name: string, data: any): Promise<string> {
    const fileName = `${name}-${uuidv4()}`;
    await (new ObjectsToCsv(data)).toDisk(`./files/${fileName}.csv`);
    return fileName;
  }
}
