import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import { State } from './interface/state.interface';

@Injectable()
export class MarketDeclined implements State {
  newBusiness() {
    throw new InternalServerErrorException('Invalid state');
  }

  marketApproved(): ResponseDto {
    return {
      message: `Business has been declined for the market as we currently do not support your industry type`,
    };
  }

  marketDeclined(): ResponseDto {
    return {
      message: `Business has been declined for the market as we currently do not support your industry type`,
    };
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
