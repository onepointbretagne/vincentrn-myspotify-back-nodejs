import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/sequelize';
import { Counter } from './model/counter.model';
import ListenedAlbum from './class/ListenedAlbum.class';

@Controller('/api/albums/last-listened')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Counter)
    private counterModel: typeof Counter,
  ) {}

  @Get('/count')
  async getCounter() {
    return this.counterModel.count();
  }

  @Get()
  async getLastListened(): Promise<ListenedAlbum[]> {
    return this.appService.getListOfLastListened()
  }

  @Get('/top10')
  async getLastListenedTop10(): Promise<ListenedAlbum[]> {
    return this.appService.getLastListenedTop10()
  }
}

