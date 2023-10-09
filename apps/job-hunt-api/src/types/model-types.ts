export enum UserType {
  COMPANY = 'COMPANY',
  USER = 'USER',
}
export enum AuthType {
  SOCIAL = 'SOCIAL',
  CUSTOM = 'CUSTOM',
}

export interface UserData {
  id?: number;
  firstName: string;
  userName: string;
  lastName: string;
  fullName?: string;
  email: string;
  contact: string;
}
export interface CompanyData {
  id?: number;
  name: string;
  vatNumber:string;
  address:string;
  foundationYear:number;
  email: string;
  contact: string;
}
