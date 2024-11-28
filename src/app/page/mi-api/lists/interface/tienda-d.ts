export interface Productos {
    products: Product[];
}

export interface Product {
    _id?:         string;
    name:        string;
    description: string;
    price:       number;
    stock:       number;
    category:    string;
    createdAt:   Date;
}