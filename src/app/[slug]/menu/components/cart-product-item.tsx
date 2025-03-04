import { Minus, Plus, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, type CartProduct } from "../context/cart";

interface CartItemProps {
    product: CartProduct;
}

const CartProductItem = ({product} : CartItemProps) => {
    const { decreaseProductQuantity } = useContext(CartContext);
    
    return ( 
        <div className="flex items-center justify-between mb-2">
            {/* Esquerda */}
            <div className="flex items-center gap-3">
                {/* Imagem */}
                <div className="relative h-20 w-20 bg-gray-200 rounded-xl">
                    <Image src={product.imageUrl} alt={product.name} fill/>
                </div>
                {/* Detalhes */}
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                    {/* Quantidade */}
                    <div className="flex items-center text-center gap-1">
                        <Button onClick={() => decreaseProductQuantity(product.id)} className="w-7 h-7 rounded-lg" variant={"outline"}>
                            <Minus size={14}/>
                        </Button>
                        <p className="w-7 ">{product.quantity}</p>
                        <Button className="w-7 h-7 rounded-lg">
                            <Plus size={14}/>
                        </Button>
                    </div>
                </div>
            </div>
            {/* Botao de Deletar */}
            <Button className="w-7 h-7 rounded-lg" variant={"outline"}>
                <TrashIcon />
            </Button>
        </div>
     );
}
 
export default CartProductItem;