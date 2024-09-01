import { Industry } from '../enums/industry.enum';
import { Contact } from './contact.entity';

export class Business {
  fein: string;
  name: string;
  industry: Industry;
  contact: Contact;
}
