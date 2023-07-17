//Lo que viene del exterior de la peticion http
export interface IApiRequestCategory {
	readonly name:string;
}

export interface IApiResponseCategory extends IApiRequestCategory {
	readonly id: number;
}

export interface IApiResponse {
	readonly message: string;
	readonly code: number;
}
