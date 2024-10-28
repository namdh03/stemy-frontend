import { Role } from '~utils/enums';

import { SuccessResponse } from './response.type';
import { TableResponseState } from './table.type';

export interface User {
  id: string;
  email: string;
  dateOfBirth: string | null;
  phone: string | null;
  fullName: string;
  address: string | null;
  role: Role;
  image: string | null;
  identityCard: string | null;
  areaId: string | null;
  hasPassword: boolean;
}

export type UserResponse = SuccessResponse<{
  user: User;
}>;

export type CreateAccountResponse = SuccessResponse<{
  id: string;
}>;

export type GoogleUrlResponse = SuccessResponse<{
  url: string;
}>;

export type VerifyTokenForgotPasswordResponse = SuccessResponse<{
  success: boolean;
}>;

export type TableAccountType = {
  id: string;
  avatar: string;
  fullName: string;
  role: Role;
  area: string;
  phone: string;
  email: string;
  address: string;
};

export type TableAccountResponse = TableResponseState<TableAccountType>;

export type TableAccountFilter = {
  name: string;
  role: string;
  area: string;
};

export type ChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateMeBody = {
  fullName: string;
  email: string;
  phone: string;
  areaId: string;
  address: string;
  createIngredientIds: string[];
  removeIngredientIds: string[];
};
