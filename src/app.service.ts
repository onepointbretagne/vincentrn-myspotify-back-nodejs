import { Injectable } from '@nestjs/common';
import ListenedAlbum from './class/ListenedAlbum.class';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getListOfLastListened(): Promise<ListenedAlbum[]> {
    const records: ListenedAlbum[] = [];
    const csvFilePath = path.resolve(
      __dirname,
      'data/listened_albums_small.csv',
    );

    const parser = fs.createReadStream(csvFilePath, { encoding: 'utf-8' }).pipe(
      parse({
        delimiter: ';',
        from_line: 2,
        columns: [
          'Id',
          'Album Name',
          'Artist Name',
          'LastListenning',
          'ListenedCount',
        ],
      }),
    );

    for await (const record of parser) {
      const listenAlbum = new ListenedAlbum();
      listenAlbum.id = record.Id;
      listenAlbum.name = record['Album Name'];
      listenAlbum.artistName = record['Artist Name'];
      listenAlbum.listenedCount = record.ListenedCount;
      listenAlbum.lastListened = new Date(record.LastListenning);
      records.push(listenAlbum);
    }
    return records
  }
  async getLastListenedTop10(): Promise<ListenedAlbum[]> {
    return (await this.getListOfLastListened()).sort(
      (a, b) => b.listenedCount - a.listenedCount
    ).slice(0,10)
  }
}
