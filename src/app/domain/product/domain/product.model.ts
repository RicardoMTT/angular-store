//Esto sera usado en la capa de aplicacion
export interface IDomainRequestProduct {
	name:string;
	descripcion: string;
	price: number;
}

export interface IDomainResponseProduct extends IDomainRequestProduct {
	id: number;
}

export interface IDomainResponse {
	message: string;
	code: number;
}
