"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
    product: Pick<Product, "imageUrl" | "name">;
}  

const ProductHeader = ({ product } : ProductHeaderProps) => {
    const router = useRouter();
    const handleBackClick = () => router.back();
return ( 
        <div className="relative w-full h-[300px]">
            <Button
                variant={"secondary"}
                size={"icon"}
                className="absolute left-4 top-4 z-10 rounded-full"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon size={24} />
            </Button>
            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
            />
            <Button
                variant={"secondary"}
                size={"icon"}
                className="absolute right-4 top-4 z-10 rounded-full"
            >
                <ScrollTextIcon size={24} />
            </Button> 
        </div> 
    );
}
 
export default ProductHeader;