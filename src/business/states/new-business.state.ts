import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { businesses } from '../businesses.data';
import { BusinessDto } from '../dto/business.dto';
import { ResponseDto } from '../dto/response.dto';
import { Industry } from '../enums/industry.enum';
import { BusinessState } from './business.state';
import { State } from './interface/state.interface';

@Injectable()
export class NewBusiness implements State {
  constructor(
    @Inject(forwardRef(() => BusinessState))
    private readonly businessState: BusinessState,
  ) {}

  newBusiness(businessDto: BusinessDto): ResponseDto | void {
    const existingBusinessIndex = businesses.findIndex(
      (x) => x.fein === businessDto.fein,
    );
    if (existingBusinessIndex > -1) {
      if (businesses[existingBusinessIndex].industry) {
        this.checkMarketApproval(businesses[existingBusinessIndex]);
        return;
      }
      if ('industry' in businessDto) {
        businesses[existingBusinessIndex] = {
          ...businesses[existingBusinessIndex],
          industry: businessDto.industry,
        };
        this.checkMarketApproval(businessDto);
        return;
      }
      return {
        message: `Business already exisits. To get it aproved for market, please provide which industry it belongs to. Your options are: ${Industry.Resturants}, ${Industry.Services}, ${Industry.Stores}, ${Industry.Wholesale}`,
      };
    }

    businesses.push({
      fein: businessDto.fein,
      name: businessDto.name,
      industry: businessDto.industry ?? undefined,
    });
    if ('industry' in businessDto) {
      this.checkMarketApproval(businessDto);
      return;
    }

    return {
      message: `Business has been added successfully. To get it aproved for market, please provide which industry it belongs to. Your options are: ${Industry.Resturants}, ${Industry.Services}, ${Industry.Stores}, ${Industry.Wholesale}`,
    };
  }

  private checkMarketApproval(businessDto: BusinessDto) {
    if (
      businessDto.industry === Industry.Stores ||
      businessDto.industry === Industry.Resturants
    ) {
      this.businessState.setState(this.businessState.marketApproved);
      return;
    }
    this.businessState.setState(this.businessState.marketDeclined);
  }

  marketApproved(): void {
    throw new InternalServerErrorException('Invalid state');
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
