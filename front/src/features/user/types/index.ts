import { IStatus } from '../../../types';

interface IUser {
  _id: string;
  email: string;
}

interface IAuthToken {
  expiresIn: number;
  token: string;
}

export interface IUserState extends IStatus {
  user: IUser;
  authToken: IAuthToken;
}
