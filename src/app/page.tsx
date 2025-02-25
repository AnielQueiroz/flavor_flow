import RestaurantsCards from "@/components/restaurants-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRestaurants } from "@/data/get-restaurants";

const HomePage = async () => {
  // Dados fictícios para exemplo
  const categories = [
    { id: 1, name: "Pizza", icon: "🍕" },
    { id: 2, name: "Hambúrguer", icon: "🍔" },
    { id: 3, name: "Sushi", icon: "🍣" },
    { id: 4, name: "Massas", icon: "🍝" },
    { id: 5, name: "Vegetariano", icon: "🥗" },
  ];

  const restaurants = await getRestaurants();

  return (
    <div className="flex flex-col h-full">
      {/* Barra de busca */}
      <div className="mx-auto px-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <Input placeholder="Buscar restaurantes..." />
          <Button className="ml-4 hover:opacity-90">Buscar</Button>
        </div>
      </div>

      {/* Categorias */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Categorias</h2>
        <div className="flex overflow-x-auto pb-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 mr-4 flex-shrink-0"
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurantes recomendados */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Restaurantes recomendados
        </h2>
        
          {restaurants.map((restaurant) => (
            <RestaurantsCards key={restaurant.id} restaurant={restaurant} />
          ))}
    
      </div>
    </div>
  );
};

export default HomePage;