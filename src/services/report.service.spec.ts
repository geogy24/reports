import { JoinerDto } from "src/facades/dtos/joiner.dto";
import { HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { TaskJoinerDto } from './dtos/task-joiner.dto';
import { JoinerFacade } from "src/facades/joiner.facade";
import { ReportService } from "./report.service";
import { TaskFacade } from "src/facades/task.facade";
import { TaskStackDto } from "src/facades/dtos/task-stack.dto";
import { TaskDayDto } from "src/facades/dtos/task-day.dto";
import { LanguageLevelDto } from "src/facades/dtos/language-level.dto";

var faker = require('faker');

describe('ReportService', () => {
  let joinerDto: JoinerDto;
  let taskFacade: TaskFacade;
  let joinerFacade: JoinerFacade;
  let httpService: HttpService;
  let reportService: ReportService;

  beforeEach(() => {
    httpService = new HttpService();
    taskFacade = new TaskFacade(httpService);
    joinerFacade = new JoinerFacade(httpService);
    reportService = new ReportService(taskFacade, joinerFacade);
  });

  describe('#tasksFilteredByStackGroupedByJoinerAndCompleteTask', () => {
    it('should return name of the csv file', async (done) => {
      const taskStackDtoData: Array<TaskStackDto> = [{
        joiner_id: faker.datatype.number(),
        completed: faker.datatype.number()
      }];

      const roleDto = {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
      }

      const stackDto = {
          id: faker.datatype.number(),
          name: faker.datatype.string(),
      }

      const languageLevelDto: LanguageLevelDto = {
          id: faker.datatype.number(),
          language: faker.datatype.string(),
          level: faker.datatype.string(),
          description: faker.datatype.string(),
      }

      const joinerDtoData = [{
          id: taskStackDtoData[0].joiner_id,
          name: faker.datatype.string(),
          role: roleDto,
          stack: stackDto,
          identification_number: faker.datatype.string(),
          last_name: faker.datatype.string(),
          domain_experience: faker.datatype.string(),
          language_level: languageLevelDto
      }]

      jest.spyOn(taskFacade, 'tasksFilteredByStackGroupedByJoinerAndCompleteTask')
                  .mockImplementation(async () => taskStackDtoData);
      jest.spyOn(joinerFacade, 'getJoiners')
                  .mockImplementation(async () => joinerDtoData);
      
      const response = await reportService.tasksFilteredByStackGroupedByJoinerAndCompleteTask(faker.datatype.number());
      
      expect(response).toContain("task_stack");
      done();
    });
  });

  describe('#daysLeftToCompleteTaskByJoiner', () => {
    it('should return name of the csv file', async (done) => {
      const TaskDayDtoData: Array<TaskDayDto> = [{
        joiner_id: faker.datatype.number(),
        days_left: faker.datatype.number()
      }];

      const roleDto = {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
      }

      const stackDto = {
          id: faker.datatype.number(),
          name: faker.datatype.string(),
      }

      const languageLevelDto: LanguageLevelDto = {
          id: faker.datatype.number(),
          language: faker.datatype.string(),
          level: faker.datatype.string(),
          description: faker.datatype.string(),
      }

      const joinerDtoData = [{
          id: TaskDayDtoData[0].joiner_id,
          name: faker.datatype.string(),
          role: roleDto,
          stack: stackDto,
          identification_number: faker.datatype.string(),
          last_name: faker.datatype.string(),
          domain_experience: faker.datatype.string(),
          language_level: languageLevelDto
      }]

      jest.spyOn(taskFacade, 'daysLeftToCompleteTaskByJoiner')
                  .mockImplementation(async () => TaskDayDtoData);
      jest.spyOn(joinerFacade, 'getJoiners')
                  .mockImplementation(async () => joinerDtoData);
      
      const response = await reportService.daysLeftToCompleteTaskByJoiner();
      
      expect(response).toContain("task_day");
      done();
    });
  });
});
