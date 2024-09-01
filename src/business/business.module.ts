import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { BusinessState } from './states/business.state';
import { DealLost } from './states/deal-lost.state';
import { DealWon } from './states/deal-won.state';
import { MarketApproved } from './states/market-approved.state';
import { MarketDeclined } from './states/market-declined.state';
import { NewBusiness } from './states/new-business.state';
import { SalesApproved } from './states/sales-approved.state';

@Module({
  controllers: [BusinessController],
  providers: [
    BusinessService,
    NewBusiness,
    MarketApproved,
    MarketDeclined,
    SalesApproved,
    DealWon,
    DealLost,
    BusinessState,
  ],
})
export class BusinessModule {}
