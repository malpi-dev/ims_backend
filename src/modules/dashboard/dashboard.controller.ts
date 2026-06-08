import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Roles('super-user', 'admin')
  @Get('metrics')
  getMetrics() {
    return this.dashboardService.getMetrics();
  }

  @Roles('technician')
  @Get('tech-metrics')
  getTechMetrics(@CurrentUser() user: { id: string }) {
    return this.dashboardService.getTechMetrics(user.id);
  }
}
