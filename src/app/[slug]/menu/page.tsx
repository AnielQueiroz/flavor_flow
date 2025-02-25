import { notFound } from "next/navigation";

import { getCategoriesByRestaurant } from "@/data/get-categories-by-restaurant";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  // Pega o slug do restaurante e o método de consumo da URL
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  // Busca o restaurante pelo slug
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }

  // Busca as categorias e produtos do restaurante
  const categoriesAndProducts = await getCategoriesByRestaurant({ restaurantId: restaurant.id, withProducts: true });

  console.log(categoriesAndProducts);

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      {/* Renderiza as categorias e produtos do restaurante */}
      {categoriesAndProducts ? (
        <RestaurantCategories restaurant={restaurant} categories={categoriesAndProducts} />
      ) : (
        <p>Este restaurante não possui categorias ou produtos</p>
      )}
    </div>
  );
};

export default RestaurantMenuPage;
