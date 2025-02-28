import NotFoundPage from "@/components/not-found";
import { getProductsById } from "@/data/get-products-by-id";

import ProductHeader from "./components/product-header";
import ProductDetails from "./components/products-details";

interface ProductPageProps {
    params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params } : ProductPageProps) => {
    const { slug, productId } = await params;
    const product = await getProductsById(productId);
    if (!product || product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
        return <NotFoundPage />;
    }

    return ( 
        <div className="flex flex-col h-full">
            <ProductHeader product={product} />
            <ProductDetails product={product} />
        </div> 
    );
}
 
export default ProductPage;