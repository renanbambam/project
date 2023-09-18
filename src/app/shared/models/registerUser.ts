import { User } from './user';

export interface RegisterUser extends User {
  name: string;
  address: string;
  addressNumber: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  birthday: string;
  document: string;
  phone: string;
  roles: string;
  company_id: string;
  avatar?: string;
  branch_id?: string;
}
