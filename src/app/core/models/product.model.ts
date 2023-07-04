export class Product {
  id: number;
  name: string;
  createdOn: string;
  descripcion: string;
  price: number;
  active: boolean;

  constructor(
    id: number,
    name: string,
    createdOn: string,
    descripcion: string,
    price: number,
    active: boolean
  ) {
    this.id = id;
    this.name = name;
    this.createdOn = createdOn;
    this.descripcion = descripcion;
    this.price = price;
    this.active = active;
  }
}
