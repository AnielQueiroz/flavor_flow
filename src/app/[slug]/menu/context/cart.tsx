"use client";

import type { Product } from "@prisma/client";
import { createContext, type ReactNode, useState } from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
    removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
    removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<CartProduct[]>([]);
    
    const toggleCart = () => setIsOpen(!isOpen);
    const addProduct = (product: CartProduct) => {
        // Encontra o índice do produto no array de produtos com base no ID
        const index = products.findIndex((p) => p.id === product.id);
    
        // Se o produto não estiver no array (index === -1), adiciona o novo produto ao array
        if (index === -1) {
            setProducts([...products, product]);
        } else {
            // Se o produto já estiver no array, atualiza a quantidade do produto existente
            const updatedProducts = products.map((p) => {
                if (p.id === product.id) {
                    return {
                        ...p, // Mantém as outras propriedades do produto
                        quantity: p.quantity + product.quantity, // Atualiza a quantidade
                    };
                }
                return p; // Retorna o produto sem alterações se o ID não corresponder
            });
            // Atualiza o estado dos produtos com o array atualizado
            setProducts(updatedProducts);
        }
    };
    const removeProduct = (productId: string) => {
        const updatedProducts = products.filter((p) => p.id !== productId);
        setProducts(updatedProducts);
    };
    
    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
            removeProduct,
        }}>
            {children}
        </CartContext.Provider>
    );
};