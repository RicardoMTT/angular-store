//Esto sera usado en la capa de aplicacion
export interface IDomainRequestCategory {
	name:string;
}

export interface IDomainResponseCategory extends IDomainRequestCategory {
	id: number;
}

export interface IDomainResponse {
	message: string;
	code: number;
}
