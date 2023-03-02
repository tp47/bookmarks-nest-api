export interface JwtAccessResponse {
  access_token: string;
}

export interface JwtPayload {
  sub: number;
  email: string;
}
