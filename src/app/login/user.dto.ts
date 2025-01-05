export class UserDTO {
  id: string;
  email: string;
  accessToken: string;

  constructor(id: string, email: string, accessToken: string) {
    this.id = id;
    this.email = email;
    this.accessToken = accessToken;
  }
}
