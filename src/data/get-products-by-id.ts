import { db } from "@/lib/prisma"

export const getProductsById = async (productId: string) => {
    return await db.product.findUnique({
        where: {
            id: productId
        },
        include: {
            restaurant:{
                select: {
                    avatarImageUrl: true,
                    name: true,
                    slug: true
                }
            }
        }
    })
};