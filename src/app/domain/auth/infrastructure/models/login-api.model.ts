export interface IApiLoginResponse {
	readonly token: string;
	readonly id: number;
  readonly email: string;
  readonly name: string;
}

export interface IDomainRequestLogin{
  email: string;
  password: string;
}
