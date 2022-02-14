export interface IUser {
  email: string,
  password: string,
  returnSecureToken?: boolean,
}

export interface IAuthResponse {
  idToken: string,
  expiresIn: string,
}
