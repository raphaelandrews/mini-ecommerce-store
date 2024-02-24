export interface Product {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  subcategory: Subcategory;
  country: Country;
  images: Image[]
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
