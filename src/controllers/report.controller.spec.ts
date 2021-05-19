import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from '../services/report.service';
import { JoinerFacade } from '../facades/joiner.facade';
import { TaskFacade } from '../facades/task.facade';
import { HttpModule } from '@nestjs/common';

describe('ReportController', () => {
  let reportController: ReportController;
  let reportService: ReportService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ReportController],
      providers: [ReportService, TaskFacade, JoinerFacade],
    }).compile();

    reportController = app.get<ReportController>(ReportController);
    reportService = app.get<ReportService>(ReportService);
  });

  describe('#taskCompletedAndUncompletedByJoiner', () => {
    it('should call one time', () => {
      let reportServiceMock = jest.spyOn(reportService, 'taskCompletedAndUncompletedByJoiner')
                    .mockImplementation(async () => "test");

      reportController.taskCompletedAndUncompletedByJoiner(null);

      expect(reportServiceMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('#daysLeftToCompleteTaskByJoiner', () => {
    it('should call one time', () => {
      let reportServiceMock = jest.spyOn(reportService, 'daysLeftToCompleteTaskByJoiner')
                    .mockImplementation(async () => "test");

      reportController.daysLeftToCompleteTaskByJoiner(null);

      expect(reportServiceMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('#taskCompletedAndUncompletedFilterByJoiner', () => {
    it('should call one time', () => {
      let reportServiceMock = jest.spyOn(reportService, 'taskCompletedAndUncompletedFilterByJoiner')
                    .mockImplementation(async () => "test");

      reportController.taskCompletedAndUncompletedFilterByJoiner(null, 1);

      expect(reportServiceMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('#tasksFilteredByStackGroupedByJoinerAndCompleteTask', () => {
    it('should call one time', () => {
      let reportServiceMock = jest.spyOn(reportService, 'tasksFilteredByStackGroupedByJoinerAndCompleteTask')
                    .mockImplementation(async () => "test");

      reportController.tasksFilteredByStackGroupedByJoinerAndCompleteTask(null, 1);

      expect(reportServiceMock).toHaveBeenCalledTimes(1);
    });
  });
});
