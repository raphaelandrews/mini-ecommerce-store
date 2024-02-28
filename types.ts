export interface Product {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  subcategory: Subcategory;
  country: Country;
  images: Image[];
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
  subcategories: Subcategory[]
};

export interface Subcategory {
  id: string;
  name: string;
};

export interface Country {
  id: string;
  name: string;
};

export interface Order {
  id: string;
  storeId: string;
  orderItems: OrderItem[];
  clientId: string;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
  price: string;
  quantity: number;
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}
