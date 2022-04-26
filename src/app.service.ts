import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}

  getHello(): string {
    return 'Hello World!';
  }

  getPing(): any {
    const luhnUser = this.database.collection('luhn');
    return luhnUser.find().toArray();
  }

  async getLogin(body: any) {
    const query = {
      'user_data.email': body.email,
      'user_data.password': body.password,
    };
    const auth = this.database.collection('luhn');
    const validate = await auth.findOne(query);
    if (validate != null) {
      return true;
    } else {
      return false;
    }
  }
}
