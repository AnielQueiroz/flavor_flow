import { Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "./ui/card";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

const RestaurantsCards = ({ restaurant } : RestaurantCardProps) => {
    return <Link href={`/${restaurant.slug}`}>
        <Card>
            <CardContent key={restaurant.id} className="flex flex-col gap-4 p-0">
                <div className="relative w-full h-40">
                    <Image src={restaurant.coverImageUrl} alt={restaurant.name} fill className="object-cover" />
                </div>
                
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600">Fast food</p>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-500">⭐ 4.5</span>
                        <span className="text-gray-500 ml-2">• Bem rápido • 30-40 min</span>
                    </div>
                </div>   
            </CardContent>
        </Card> 
</Link>
    
    
}
 
export default RestaurantsCards;