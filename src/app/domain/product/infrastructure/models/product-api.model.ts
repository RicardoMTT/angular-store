//Lo que viene del exterior de la peticion http, contrato de todas las APIS que estoy consumiendo
export interface IApiRequestProduct {
	readonly name:string;
	readonly descripcion: string;
	readonly price: number;
}

export interface IApiResponseProduct extends IApiRequestProduct {
	readonly id: number;
}

export interface IApiResponse {
	readonly message: string;
	readonly code: number;
}
