import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import { BusinessState } from './business.state';
import { State } from './interface/state.interface';

@Injectable()
export class DealLost implements State {
  constructor(
    @Inject(forwardRef(() => BusinessState))
    private readonly businessState: BusinessState,
  ) {}

  newBusiness() {
    return;
  }

  marketApproved(): void {
    return;
  }

  marketDeclined(): void {
    return;
  }

  salesApproved(): void {
    return;
  }

  dealWon(): void {
    return;
  }

  dealLost(): ResponseDto {
    return {
      message: `We are sorry. But your business has lost the deal.`,
    };
  }
}
