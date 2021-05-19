import { JoinerDto } from "src/facades/dtos/joiner.dto";
import { TaskDayDto } from 'src/services/dtos/task-day.dto';
import { TaskFacade } from './task.facade';
import { HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { TaskStackDto } from './dtos/task-stack.dto';
import { TaskJoinerDto } from './dtos/task-joiner.dto';

var faker = require('faker');

describe('TaskFacade', () => {
  let joinerDto: JoinerDto;
  let taskFacade: TaskFacade;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    taskFacade = new TaskFacade(httpService);
  });

  describe('#tasksFilteredByStackGroupedByJoinerAndCompleteTask', () => {
    it('should return TaskStackDto', async (done) => {
      const data: Array<TaskStackDto> = [{
        joiner_id: faker.datatype.number(),
        completed: faker.datatype.number()
      }];
      const stackId = faker.datatype.number();
      const response: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: `http://localhost:8081/api/reports/stacks?stack_id=${stackId}` },
        status: 200,
        statusText: 'OK',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(response));

      taskFacade.tasksFilteredByStackGroupedByJoinerAndCompleteTask(stackId)
        .then(response => {
          expect(response).toEqual(data);
          done();
        });
    });
  });

  describe('#taskCompletedAndUncompletedByJoiner', () => {
    it('should return TaskJoinerDto', async (done) => {
      const data: Array<TaskJoinerDto> = [{
        name: faker.datatype.string(),
        id: faker.datatype.number(),
        stack: faker.datatype.number(),
        description: faker.datatype.string(),
        joiner_id: faker.datatype.number(),
        roles: faker.datatype.string(),
        parent_task: faker.datatype.number(),
        worked_hours: faker.datatype.number(),
        estimated_required_hours: faker.datatype.number(),
      }];
      const response: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: `http://localhost:8081/api/reports/tasks` },
        status: 200,
        statusText: 'OK',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(response));

      taskFacade.taskCompletedAndUncompletedByJoiner()
        .then(response => {
          expect(response).toEqual(data);
          done();
        });
    });
  });

  describe('#taskCompletedAndUncompletedFilterByJoiner', () => {
    it('should return TaskJoinerDto', async (done) => {
      const data: Array<TaskJoinerDto> = [{
        name: faker.datatype.string(),
        id: faker.datatype.number(),
        stack: faker.datatype.number(),
        description: faker.datatype.string(),
        joiner_id: faker.datatype.number(),
        roles: faker.datatype.string(),
        parent_task: faker.datatype.number(),
        worked_hours: faker.datatype.number(),
        estimated_required_hours: faker.datatype.number(),
      }];
      const joinerId = faker.datatype.number();
      const response: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: `http://localhost:8081/api/reports/joiners/${joinerId}/tasks` },
        status: 200,
        statusText: 'OK',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(response));

      taskFacade.taskCompletedAndUncompletedFilterByJoiner(joinerId)
        .then(response => {
          expect(response).toEqual(data);
          done();
        });
    });
  });

  describe('#daysLeftToCompleteTaskByJoiner', () => {
    it('should return TaskDayDto', async (done) => {
      const data: Array<TaskDayDto> = [{
        id: faker.datatype.number(),
        name: faker.datatype.string(),
        role: faker.datatype.string(),
        stack: faker.datatype.string(),
        identification_number: faker.datatype.string(),
        last_name: faker.datatype.string(),
        domain_experience: faker.datatype.string(),
        language_level: faker.datatype.string(),
        days_left: faker.datatype.number()
      }];
      const joinerId = faker.datatype.number();
      const response: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: `http://localhost:8081/api/reports/days` },
        status: 200,
        statusText: 'OK',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(response));

      taskFacade.daysLeftToCompleteTaskByJoiner()
        .then(response => {
          expect(response).toEqual(data);
          done();
        });
    });
  });
});
