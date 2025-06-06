export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface JWTAccessToken {
  access_token: string;
}

export interface BaseEntity {
  id: string;
  name: string;
}
