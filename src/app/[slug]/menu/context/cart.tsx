"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

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
        const index = products.findIndex((p) => p.id === product.id);
        if (index === -1) {
            setProducts([...products, product]);
        } else {
            const updatedProducts = products.map((p) => {
                if (p.id === product.id) {
                    return {
                        ...p,
                        quantity: p.quantity + product.quantity,
                    };
                }
                return p;
            });
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