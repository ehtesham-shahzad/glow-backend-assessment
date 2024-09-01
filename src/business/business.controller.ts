import { Body, Controller, Get, Post } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDto } from './dto/business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() businessDto: BusinessDto) {
    return this.businessService.create(businessDto);
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }
}
