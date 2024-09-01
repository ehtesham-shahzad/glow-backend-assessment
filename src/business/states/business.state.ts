import { Injectable, Scope } from '@nestjs/common';
import { DealLost } from './deal-lost.state';
import { DealWon } from './deal-won.state';
import { State } from './interface/state.interface';
import { MarketApproved } from './market-approved.state';
import { MarketDeclined } from './market-declined.state';
import { NewBusiness } from './new-business.state';
import { SalesApproved } from './sales-approved.state';

@Injectable({ scope: Scope.REQUEST })
export class BusinessState {
  private state: State;
  constructor(
    readonly newBusiness: NewBusiness,
    readonly marketApproved: MarketApproved,
    readonly marketDeclined: MarketDeclined,
    readonly salesApproved: SalesApproved,
    readonly dealWon: DealWon,
    readonly dealLost: DealLost,
  ) {
    this.setState(this.newBusiness);
  }

  setState(state: State) {
    this.state = state;
  }

  getState(): State {
    return this.state;
  }
}
