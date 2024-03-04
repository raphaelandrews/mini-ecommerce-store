import { Category } from "@/types";
import ProductList from "./product-list";

interface CategoriesListHomeProps {
    categories: Category[];
}

const CategoriesListHome = ({ categories }: CategoriesListHomeProps) => {
    return (
        <>
            {categories
                .filter(category => category.subcategories.length > 0) 
                .map((category) => (
                    <ProductList
                        key={category.id}
                        title={category.name}
                        items={category.subcategories.flatMap((subcategory) => (
                            subcategory.products
                        ))}
                    />
                ))
            }
        </>
    );
}

export default CategoriesListHome;
