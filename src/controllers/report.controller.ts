import { Controller, Get, Query, Res } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { Response } from 'express';

@Controller('/api/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/stacks')
  async tasksFilteredByStackGroupedByJoinerAndCompleteTask(
    @Res() res: Response, @Query('stack_id') stackId: number
  ): Promise<void> {
    const fileName = await this.reportService.tasksFilteredByStackGroupedByJoinerAndCompleteTask(stackId);
    res.download(`./files/${fileName}.csv`)
  }
}
