import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Favorite extends Model {
  @Column
  id_album: string;
}
