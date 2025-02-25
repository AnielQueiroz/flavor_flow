import { db } from "@/lib/prisma";

interface GetCategoriesByRestaurantParams {
    restaurantId: string;
    withProducts?: boolean;
}

export const getCategoriesByRestaurant = async ({ restaurantId, withProducts = false }: GetCategoriesByRestaurantParams) => {
    console.log('restaurantId: ', restaurantId);
    const categories = await db.menuCategory.findMany({
        where: {
            restaurantId
        },
        include: {
            products: withProducts
        }
    });
    console.log(categories);
    return categories;
};