import { JoinerDto } from "src/facades/dtos/joiner.dto";
import { RoleDto } from "src/facades/dtos/role.dto";
import { StackDto } from "src/facades/dtos/stack.dto";
import { LanguageLevelDto } from "src/facades/dtos/language-level.dto";
import { TaskStackDto } from './task-stack.dto';

var faker = require('faker');

describe('TaskStackDto', () => {
  let joinerDto: JoinerDto;

  beforeEach(() => {
    const roleDto: RoleDto = {
        id: faker.datatype.number(),
        name: faker.datatype.string(),
    }

    const stackDto: StackDto = {
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
    it('Get a TaskStackDto object', () => {
      const taskStackDto = TaskStackDto.toPresentation(joinerDto);

      expect(taskStackDto).toBeInstanceOf(TaskStackDto);
      expect(taskStackDto.id).toEqual(joinerDto.id);
    });
  });
});
