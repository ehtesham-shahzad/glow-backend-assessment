import { Injectable } from '@nestjs/common';
import { businesses } from './businesses.data';
import { BusinessDto } from './dto/business.dto';
import { ResponseDto } from './dto/response.dto';
import { BusinessState } from './states/business.state';

@Injectable()
export class BusinessService {
  constructor(private readonly businessState: BusinessState) {}

  create(businessDto: BusinessDto): ResponseDto {
    const newBusiness = this.businessState.getState().newBusiness(businessDto);
    if (newBusiness) {
      return newBusiness;
    }

    const marketApproved = this.businessState
      .getState()
      .marketApproved(businessDto);
    if (marketApproved) {
      return marketApproved;
    }

    const salesApproved = this.businessState
      .getState()
      .salesApproved(businessDto);
    if (salesApproved) {
      return salesApproved;
    }

    const dealWon = this.businessState.getState().dealWon();
    if (dealWon) {
      return dealWon;
    }

    const dealLost = this.businessState.getState().dealLost();
    if (dealLost) {
      return dealLost;
    }
  }

  findAll() {
    return businesses;
  }
}
