import { db } from "@/lib/prisma";

export const getRestaurants = async () => {
    return db.restaurant.findMany();
};