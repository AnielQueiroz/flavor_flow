import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo e titulo */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={restaurant?.avatarImageUrl}
            alt={restaurant?.name}
            fill
            className="rounded-md object-contain"
          />
        </div>

        <h2 className="font-semibold">{restaurant?.name}</h2>
      </div>

      {/* Bem vindo e descrição */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem vindo!</h3>
        <p className="opacity-55">{restaurant?.description}</p>
      </div>

      {/* Forma de consumo */}
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/dine_in.png"
          alt="Para comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/hamburger.png"
          alt="Para levar"
          buttonText="Para levar"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
