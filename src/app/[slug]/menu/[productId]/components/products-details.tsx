"use client";

import { Prisma} from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    avatarImageUrl: true,
                    name: true
                }
            } 
        };
    }>;
}

const ProductDetails = ({ product } : ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleIncreaseQuantity = () => setQuantity(quantity + 1);
    return ( 
        <div className="relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] p-5 bg-gray-100 flex-auto flex flex-col">
            <div className="flex-auto">
                {/* Restaurante */}
            <div className="flex items-center gap-1">
                <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={30} height={30} className="rounded-full" />
                <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
            </div>

            {/* Nome do produto */}
            <h2 className="text-xl font-semibold mt-1">{product.name}</h2>

            {/* Preco e quantidade */}
            <div className="flex items-center justify-between">
                {/* Preço */}
                <h3 className="text-cl font-semibold">{formatCurrency(product.price)}</h3>
                {/* Quantidade */}
                <div className="flex items-center gap-3 text-center">
                    <Button onClick={handleDecreaseQuantity} variant={"outline"} className="h-8 w-8 rounded-xl">
                        <ChevronLeftIcon />
                    </Button>
                    <p className="text-muted-foreground w-4">{quantity}</p>
                    <Button onClick={handleIncreaseQuantity} variant={"default"} className="h-8 w-8 rounded-xl">
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>

            {/* Sobre */}
            <div className="mt-6 space-y-3">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            {/* Ingredientes */}
            <div className="mt-6 space-y-3">
                <div className="flex items-center gap-1">
                    <ChefHatIcon size={18} />
                    <h4 className="font-semibold">Ingredientes</h4>
                </div>
                <p className="text-sm text-muted-foreground">{product.ingredients}</p>
            </div>
            </div>

            {/* Botão de adicionar a sacola */}
            <Button variant={"default"} className="mt-6 w-full rounded-full">
                Adicionar à sacola
            </Button>
        </div> 
    );
}
 
export default ProductDetails;