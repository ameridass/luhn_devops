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

  valid_credit_card(value): any {
    if (/[^0-9-\s]+/.test(value)) return false;

    let nCheck = 0,
      nDigit = 0,
      bEven = false;
    value = value.toString().replace(/\D/g, '');

    for (let n = value.length - 1; n >= 0; n--) {
      let cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 == 0;
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
