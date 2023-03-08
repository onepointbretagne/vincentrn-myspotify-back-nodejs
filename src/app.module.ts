import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FavController } from './fav.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Counter } from './model/counter.model';
import { Favorite } from './model/favorite.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      autoLoadModels: true,
      synchronize: true,
      models: [Counter, Favorite],
    }),
    SequelizeModule.forFeature([Counter, Favorite]),
  ],
  controllers: [AppController, FavController],
  providers: [AppService],
})
export class AppModule {}
