import { Observable } from "rxjs";
import { IApiLoginResponse, IDomainRequestLogin } from "./models/login-api.model";

export interface ILoginApiService {

	login(loginDto:IDomainRequestLogin): Observable<IApiLoginResponse>;

}
