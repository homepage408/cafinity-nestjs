export class LoginResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    uuid: string;
    fullname: string;
    email: string;
  };

  constructor(
    access_token: string,
    refresh_token: string,
    user: { uuid: string; fullname: string; email: string },
  ) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.user = user;
  }
}
