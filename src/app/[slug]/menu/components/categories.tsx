"use client";

import { Prisma, Restaurant } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import ProductsList from "./products";

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
      products: true;
  }
}>

interface RestaurantCategoriesProps {
  categories: MenuCategoriesWithProducts[];
  restaurant: Pick<Restaurant, "avatarImageUrl" | "description" | "name">;
}


const RestaurantCategories = ({
  restaurant,
  categories
}: RestaurantCategoriesProps) => {  
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(categories[0]);
    const handleCategoryClick = (category: MenuCategoriesWithProducts) => setSelectedCategory(category);
    const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
        return selectedCategory.id === category.id ? "default" : "secondary"
    };

    selectedCategory.products.forEach(product => console.log(product.name));
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-gray-100 flex-auto">
      <div className="p-4">
        <div className="flex items-center gap-3">
            <div className="relative h-[45px] w-[45px]">
            <Image
                src={restaurant.avatarImageUrl}
                alt={restaurant.name}
                fill
                className="rounded-md object-contain"
            />
            </div>
            <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
            </div>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
            <ClockIcon size={12} />
            <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
            {categories.map(category => (
                <Button key={category.id} onClick={() => handleCategoryClick(category)} variant={getCategoryButtonVariant(category)} size="sm" className="rounded-full">
                    {category.name} 
                </Button>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="font-semibold p-5 pt-2">{selectedCategory.name}</h3>
      <ProductsList products={selectedCategory.products} />
    </div>
  );
};

export default RestaurantCategories;
