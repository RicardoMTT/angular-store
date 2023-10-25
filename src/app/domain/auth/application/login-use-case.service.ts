import { Inject, Injectable } from "@angular/core";
import { HTTP_LOGIN_SERVICE } from "../infrastructure/providers/login-api.provider";
import { ILoginApiService } from "../infrastructure/login-api.interface";
import { IDomainRequestLogin } from "../infrastructure/models/login-api.model";

@Injectable({ providedIn: 'root' })
export class LoginUseCaseService {
    constructor(@Inject(HTTP_LOGIN_SERVICE) private _loginApiService: ILoginApiService) {}

    login(iDomainRequestLogin:IDomainRequestLogin)  {
		  return this._loginApiService.login(iDomainRequestLogin);
	}
}
