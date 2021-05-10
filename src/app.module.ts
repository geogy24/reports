import { Module, HttpModule } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { JoinerFacade } from './facades/joiner.facade';
import { TaskFacade } from './facades/task.facade';
import { ReportService } from './services/report.service';

@Module({
  imports: [HttpModule],
  controllers: [ReportController],
  providers: [ReportService, TaskFacade, JoinerFacade],
})
export class AppModule {}
