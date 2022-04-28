import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo_prod:27017', {
      user: 'root_prod',
      pass: 'pass',
      dbName: 'devops',
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uriProd =
          'mongodb://root_prod:pass@mongo_prod:27017/?authSource=admin&readPreference=primary';
        const uriDev =
          'mongodb://root_prod:pass@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';
        const client = new MongoClient(uriProd);
        await client.connect();
        const database = client.db('devops');
        return database;
      },
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
