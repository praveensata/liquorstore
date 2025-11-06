export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: Date;
}
