"use client";

import { Prisma} from "@prisma/client";
import { ChefHatIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    const getDecreaseButtonVariant = () => quantity === 1 ? "secondary" : "default";
    return ( 
        <div className="relative z-50 rounded-t-3xl py-5 pb-2 mt-[-1.5rem] p-5 bg-gray-100 flex-auto flex flex-col overflow-hidden">
            <div className="h-[100%] overflow-hidden">
                {/* Restaurante */}
                <div className="flex items-center gap-1">
                    <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={30} height={30} className="rounded-full" />
                    <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
                </div>

                {/* Nome do produto */}
                <h2 className="text-xl font-semibold mt-1">{product.name}</h2>

                {/* Preco e quantidade */}
                <div className="flex items-center justify-between mt-3">
                    {/* Preço */}
                    <h3 className="text-cl font-semibold">{formatCurrency(product.price)}</h3>
                    {/* Quantidade */}
                    <div className="flex items-center gap-3 text-center">
                        <Button onClick={handleDecreaseQuantity} variant={getDecreaseButtonVariant()} className="h-8 w-8 rounded-xl">
                            <Minus />
                        </Button>
                        <p className="text-muted-foreground w-4">{quantity}</p>
                        <Button onClick={handleIncreaseQuantity} variant={"default"} className="h-8 w-8 rounded-xl">
                            <Plus />
                        </Button>
                    </div>
                </div>

                {/* Scroll Area */}
                <ScrollArea className="h-[20rem]">                    
                    {/* Sobre */}
                    <div className="mt-6 space-y-3">
                        <h4 className="font-semibold">Sobre</h4>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>

                    {/* Ingredientes */}
                    {product.ingredients.length > 0 && (
                        <div className="mt-6 mb-3 space-y-3">
                            <div className="flex items-center gap-1">
                                <ChefHatIcon size={18} />
                                <h4 className="font-semibold">Ingredientes</h4>
                            </div>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {product.ingredients.map((ingredient) => (
                                    console.log(ingredient),
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
       
                </ScrollArea>
            </div>

            {/* Botão de adicionar a sacola */}
            <Button variant={"default"} className="w-full rounded-full">
                Adicionar à sacola
            </Button>
        </div> 
    );
}
 
export default ProductDetails;