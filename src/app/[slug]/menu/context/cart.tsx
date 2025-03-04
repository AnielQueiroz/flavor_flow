"use client";

import type { Product } from "@prisma/client";
import { createContext, type ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
    removeProduct: (productId: string) => void;
    decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
    removeProduct: () => {},
    decreaseProductQuantity: () => {}
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<CartProduct[]>([]);
    
    const toggleCart = () => setIsOpen(!isOpen);
    // MINHA IMPLEMENTAÇÃO
    // const addProduct = (product: CartProduct) => {
    //     // Encontra o índice do produto no array de produtos com base no ID
    //     const index = products.findIndex((p) => p.id === product.id);
    
    //     // Se o produto não estiver no array (index === -1), adiciona o novo produto ao array
    //     if (index === -1) {
    //         setProducts([...products, product]);
    //     } else {
    //         // Se o produto já estiver no array, atualiza a quantidade do produto existente
    //         const updatedProducts = products.map((p) => {
    //             if (p.id === product.id) {
    //                 return {
    //                     ...p, // Mantém as outras propriedades do produto
    //                     quantity: p.quantity + product.quantity, // Atualiza a quantidade
    //                 };
    //             }
    //             return p; // Retorna o produto sem alterações se o ID não corresponder
    //         });
    //         // Atualiza o estado dos produtos com o array atualizado
    //         setProducts(updatedProducts);
    //     }
    // };

    // FSW - DONALDS
    const addProduct = (product: CartProduct) => {
        // Verifica se o produto já está no carrinho
        const productIsAlreadyInCart = products.some(prevProduct => prevProduct.id === product.id);
        
        // Se o produto não estiver no carrinho, adiciona o novo produto ao array de produtos
        if (!productIsAlreadyInCart) {
            return setProducts((prevProducts) => [...prevProducts, product]);
        }

        // Se o produto já estiver no carrinho, atualiza a quantidade do produto existente
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct, // Mantém as outras propriedades do produto
                        quantity: prevProduct.quantity + product.quantity // Atualiza a quantidade
                    };
                }
                return prevProduct; // Retorna o produto sem alterações se o ID não corresponder
            });
        });
    };
    const removeProduct = (productId: string) => {
        const updatedProducts = products.filter((p) => p.id !== productId);
        setProducts(updatedProducts);
    };
    const decreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id !== productId) return prevProduct;

                if (prevProduct.quantity === 1) {
                    return prevProduct;
                }

                return {
                    ...prevProduct,
                    quantity: prevProduct.quantity - 1
                }               
            })
        })
    };
    
    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
            removeProduct,
            decreaseProductQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};