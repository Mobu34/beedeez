import { IRequestStatus, IStatus } from '../../../types';
import { LoginMode } from '../../login/enums';
import { IFormData } from '../../login/types';

interface IUser {
  _id: string;
  email: string;
}

interface IAuthToken {
  expiresIn: number;
  token: string;
}

export interface IUserAuthToken {
  user: IUser;
  authToken: IAuthToken;
}

export interface IUserState extends IUserAuthToken, IStatus {}

export interface IAuthenticationOutput extends IUserAuthToken, IRequestStatus {}

export interface IAuthenticationInput extends IFormData {
  loginMode: LoginMode;
}
