import { Controller, Get, Param } from '@nestjs/common';
import { AppService, rssItem } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':userId')
  getHello(@Param() params: any): Promise<[rssItem]> {
    return this.appService.getMediumRss(params.userId);
  }

  @Get()
  getValidAccounts(): string[] {
    return this.appService.getValidAccounts();
  }
}
