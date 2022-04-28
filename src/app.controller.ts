import {Controller, Get, Post, Body, Inject} from '@nestjs/common';
import { AppService } from './app.service';
import { Db } from 'mongodb'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              @Inject('MONGO') private database: Db) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/ping')
  ping(): string {
    return this.appService.getPing();
  }
  @Post('login')
  getLogin(@Body() payload: any) {
    return this.appService.getLogin(payload);
  }
  @Post('validacion-luhn')
  getValidation(@Body() body: any): any {
    let isValidNumber = this.appService.valid_credit_card(body.creditCardNumber);
    let newRegistro = this.database.collection('luhn')
    isValidNumber ? newRegistro.insertOne({numero_tarjeta: body.creditCardNumber, is_valid: isValidNumber}) : ""

    return isValidNumber
  }
}
