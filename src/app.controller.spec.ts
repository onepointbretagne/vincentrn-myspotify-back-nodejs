import { Test, TestingModule } from '@nestjs/testing';
import { Counter } from './model/counter.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return an album list', () => {
      expect(appController.getLastListened()).resolves.not.toBeNull();
      expect(appController.getLastListened()).resolves.toHaveLength(100);
    });
  });
});
