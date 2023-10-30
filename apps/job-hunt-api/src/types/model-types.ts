export enum CompanyBasedJobStatus {
  NEW = 'new',
  PAST = 'past',
  INTERVIEWS = 'interviews',
}
export enum UserBasedJobStatus {
  CANCELLED = 'cancelled',
  APPLIED = 'applied',
  INTERVIEWS = 'interviews',
}

export enum socialplatformType {
  FACEBOOK = 'facebook',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  CRUNCHBASE = 'crunchbase',
}
export enum contactType {
  PHONE = 'phone',
  EMAIL = 'email',
}
export enum UserType {
  COMPANY = 'company',
  USER = 'user',
}
export enum AuthStatus {
  ACTIVATION_PENDING = 'activation_pending',
  USER_VERIFIED = 'user_verified',
}
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum identityType {
  ID_CARD = 'id card',
  PASSPORT = 'passport',
  DRIVING_LICENSE = 'driving license',
}
export enum employmentTypes {
  FULL_TIME = 'full time',
  PART_TIME = 'part time',
  HOURLY = 'hourly',
  CONTRACT = 'contract',
  TRAINEE = 'trainee',
}
export enum AuthType {
  SOCIAL = 'social',
  CUSTOM = 'custom',
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
  vatNumber: string;
  address: string;
  foundationYear: number;
  email: string;
  contact: string;
}
