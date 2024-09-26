// import { SuccessResponse } from './response.type';

// export type AuthResponse = SuccessResponse<{
//   access_token: string;
//   refresh_token: string;
// }>;

import { SuccessResponse } from './response.type';

export type LoginResponse = SuccessResponse<{
  login: {
    access_token: string;
  };
}>;

export type RegisterResponse = SuccessResponse<{
  register: {
    access_token: string;
  };
}>;
