import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BusinessDto } from '../dto/business.dto';
import { ResponseDto } from '../dto/response.dto';
import { Deal } from '../enums/deal.enum';
import { BusinessState } from './business.state';
import { State } from './interface/state.interface';

@Injectable()
export class SalesApproved implements State {
  constructor(
    @Inject(forwardRef(() => BusinessState))
    private readonly businessState: BusinessState,
  ) {}

  newBusiness() {
    throw new InternalServerErrorException('Invalid state');
  }

  marketApproved(): void {
    throw new InternalServerErrorException('Invalid state');
  }

  marketDeclined(): void {
    throw new InternalServerErrorException('Invalid state');
  }

  salesApproved(businessDto: BusinessDto): ResponseDto | void {
    if (businessDto.deal === Deal.Won) {
      return this.businessState.setState(this.businessState.dealWon);
    }
    if (businessDto.deal === Deal.Lost) {
      return this.businessState.setState(this.businessState.dealLost);
    }

    return {
      message: `Pending deal with business`,
    };
  }

  dealWon(): void {
    throw new InternalServerErrorException('Invalid state');
  }

  dealLost(): void {
    throw new InternalServerErrorException('Invalid state');
  }
}
