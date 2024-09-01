import { BusinessDto } from 'src/business/dto/business.dto';
import { ResponseDto } from 'src/business/dto/response.dto';

export interface State {
  newBusiness: (businessDto: BusinessDto) => ResponseDto | void;
  marketApproved: (businessDto: BusinessDto) => ResponseDto | void;
  marketDeclined: () => ResponseDto | void;
  salesApproved: (businessDto: BusinessDto) => ResponseDto | void;
  dealWon: () => ResponseDto | void;
  dealLost: () => ResponseDto | void;
}
