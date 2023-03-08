import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './model/favorite.model';

@Controller('/api/fav')
export class FavController {
  constructor(
    @InjectModel(Favorite)
    private favoriteModel: typeof Favorite,
  ) {}

   @Get()
  async getFavList(): Promise<any[]> {
    return this.favoriteModel.findAll();
  }

  @Post()
  addfav(@Body() body: any): Promise<any> {
    return this.favoriteModel.create(body);
  }
}
