export interface Product {
    id:               number;
    name:             string;
    availability:     string;
    badges:           string;
    brand:            Brand;
    compareAtPrice:   number;
    images:           string[];
    price:            number;
    priceunit:        number;
    taxes:            number;
    discount:         number;
    discountPerc:     number;
    descUM:           string;
    um:               string;
    rating:           number;
    reviews:          number;
    sku:              string;
    slug:             string;
    idMarca:          number;
    marca:            string;
    tieneDescuento:   string;
    color:            string;
    colorhx:          string;
    valorIndividual:  string;
    inventario:       number;
    inventarioPedido: number;
    caracteristicas: string;
    observaciones: string;
}

export interface Brand {
    id:     number;
    name:   string;
    slug:   string;
    imagen: string;
}
