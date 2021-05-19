import { Test, TestingModule } from '@nestjs/testing';
import { JoinerDto } from "src/facades/dtos/joiner.dto";
import { RoleDto } from "src/facades/dtos/role.dto";
import { StackDto } from "src/facades/dtos/stack.dto";
import { LanguageLevelDto } from "src/facades/dtos/language-level.dto";
import { TaskDayDto } from 'src/services/dtos/task-day.dto';
import { TaskFacade } from './task.facade';
import { HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { TaskStackDto } from './dtos/task-stack.dto';
import { TaskJoinerDto } from './dtos/task-joiner.dto';
import { JoinerFacade } from './joiner.facade';

var faker = require('faker');

describe('TaskFacade', () => {
  let joinerDto: JoinerDto;
  let joinerFacade: JoinerFacade;
  let httpService: HttpService;

  beforeEach(() => {
    httpService = new HttpService();
    joinerFacade = new JoinerFacade(httpService);
  });

  describe('#getJoiners', () => {
    it('should return TaskStackDto', async (done) => {
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

      const joinerDto = {
          id: faker.datatype.number(),
          name: faker.datatype.string(),
          role: roleDto,
          stack: stackDto,
          identification_number: faker.datatype.string(),
          last_name: faker.datatype.string(),
          domain_experience: faker.datatype.string(),
          language_level: languageLevelDto
      }
      const joinerId = joinerDto.id;

      const data: JoinerDto = joinerDto;

      const response: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: `http://localhost:8081/api/joiners/${joinerId}` },
        status: 200,
        statusText: 'OK',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(response));

      joinerFacade.getJoiners([joinerId])
        .then(response => {
          expect(response).toEqual([data]);
          done();
        });
    });
  });

  describe('#getStacks', () => {
    it('should return StackDto', async (done) => {
      const stackDto: StackDto = {
          id: faker.datatype.number(),
          name: faker.datatype.string(),
      }
      const stackId = stackDto.id;
      const data: StackDto = stackDto;

      const response: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: `http://localhost:8081/api/stacks/${stackId}` },
        status: 200,
        statusText: 'OK',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(response));

      joinerFacade.getStacks([stackId])
        .then(response => {
          expect(response).toEqual([data]);
          done();
        });
    });
  });

  describe('#getStacks', () => {
    it('should return StackDto', async (done) => {
      const roleDto: RoleDto = {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
    }
      const roleId = roleDto.id;
      const data: RoleDto = roleDto;

      const response: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: `http://localhost:8081/api/roles?id=${roleId}` },
        status: 200,
        statusText: 'OK',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(response));

      joinerFacade.getRoles([roleId])
        .then(response => {
          expect(response).toEqual(data);
          done();
        });
    });
  });
});
