import { JoinerDto } from "src/facades/dtos/joiner.dto";
import { RoleDto } from "src/facades/dtos/role.dto";
import { StackDto } from "src/facades/dtos/stack.dto";
import { LanguageLevelDto } from "src/facades/dtos/language-level.dto";

import { TaskJoinerDto as TaskJoinerFacade } from 'src/facades/dtos/task-joiner.dto';
import { TaskJoinerDto } from './task-joiner.dto';

var faker = require('faker');

describe('TaskJoinerDto', () => {
  let taskJoinerFacade: TaskJoinerFacade;
  let joinerDto: JoinerDto;
  let stackDto: StackDto;
  let roleDto: RoleDto;

  beforeEach(() => {
    taskJoinerFacade = {
      name: faker.datatype.string(),
      id: faker.datatype.number(),
      stack: faker.datatype.number(),
      description: faker.datatype.string(),
      joiner_id: faker.datatype.number(),
      roles: faker.datatype.string(),
      parent_task: faker.datatype.number(),
      worked_hours: faker.datatype.number(),
      estimated_required_hours: faker.datatype.number(),
    }

    roleDto = {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
    }

    stackDto = {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
    }

    const languageLevelDto: LanguageLevelDto = {
        id: faker.datatype.number(),
        language: faker.datatype.string(),
        level: faker.datatype.string(),
        description: faker.datatype.string(),
    }

    joinerDto = {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
        role: roleDto,
        stack: stackDto,
        identification_number: faker.datatype.string(),
        last_name: faker.datatype.string(),
        domain_experience: faker.datatype.string(),
        language_level: languageLevelDto
    }
  });

  describe('#toPresentation', () => {
    it('Get a TaskJoinerDto object', () => {
      const taskJoinerDto = TaskJoinerDto.toPresentation(taskJoinerFacade);

      expect(taskJoinerDto).toBeInstanceOf(TaskJoinerDto);
      expect(taskJoinerDto.task_id).toEqual(taskJoinerFacade.id);
    });
  });

  describe('#addJoinerData', () => {
    it('Get a TaskJoinerDto object with JoinerDto data', () => {
      const taskJoinerDto = TaskJoinerDto.toPresentation(taskJoinerFacade);
      taskJoinerDto.addJoinerData(joinerDto)

      expect(taskJoinerDto.joiner_id).toEqual(joinerDto.id);
    });
  });

  describe('#addRoleData', () => {
    it('Get a TaskJoinerDto object with role\'s name', () => {
      const taskJoinerDto = TaskJoinerDto.toPresentation(taskJoinerFacade);
      taskJoinerDto.addRoleData(roleDto.name);
      
      expect(taskJoinerDto.task_roles).toEqual(roleDto.name);
    });
  });

  describe('#addStackData', () => {
    it('Get a TaskJoinerDto object with stack\'s name', () => {
      const taskJoinerDto = TaskJoinerDto.toPresentation(taskJoinerFacade);
      taskJoinerDto.addStackData(stackDto);
      
      expect(taskJoinerDto.task_stack).toEqual(stackDto.name);
    });
  });
});
