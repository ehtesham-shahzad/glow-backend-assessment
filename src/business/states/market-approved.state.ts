import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { businesses } from '../businesses.data';
import { BusinessDto } from '../dto/business.dto';
import { ResponseDto } from '../dto/response.dto';
import { BusinessState } from './business.state';
import { State } from './interface/state.interface';

@Injectable()
export class MarketApproved implements State {
  constructor(
    @Inject(forwardRef(() => BusinessState))
    private readonly businessState: BusinessState,
  ) {}

  newBusiness() {
    throw new InternalServerErrorException('Invalid state');
  }

  marketApproved(businessDto: BusinessDto): ResponseDto | void {
    if (!('contact' in businessDto)) {
      return {
        message: `Business has been approved for the market. To reach the status of 'Sales Approved', please provide contact details. This includes contact name and phone number`,
      };
    }
    const businessIndex = businesses.findIndex(
      (x) => x.fein === businessDto.fein,
    );
    /**
     * This `if` condition shouldn't run because this method is only triggered after data has been saved.
     * It exists to check there is no error in the code.
     */
    if (businessIndex === -1) {
      throw new InternalServerErrorException('Business not found');
    }
    if (!('contact' in businesses[businessIndex])) {
      businesses[businessIndex] = {
        ...businesses[businessIndex],
        contact: {
          name: businessDto.contact.name,
          phone: businessDto.contact.phone,
        },
      };
    }

    this.businessState.setState(this.businessState.salesApproved);
  }

  marketDeclined(): void {
    throw new InternalServerErrorException('Invalid state');
  }

  salesApproved(): void {
    throw new InternalServerErrorException('Invalid state');
  }

  dealWon(): void {
    throw new InternalServerErrorException('Invalid state');
  }

  dealLost(): void {
    throw new InternalServerErrorException('Invalid state');
  }
}
