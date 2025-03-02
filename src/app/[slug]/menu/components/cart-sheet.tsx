import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../context/cart";

const CartSheet = () => {
    const { isOpen, toggleCart, products } = useContext(CartContext);
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Sacola</SheetTitle>
                <SheetDescription>
                    Detalhes do seu pedido
                </SheetDescription>
                </SheetHeader>
                {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                        {product.name} - {product.quantity} x R$ {product.price}
                    </div>
                ))}
            </SheetContent>
        </Sheet> 
    );
}
 
export default CartSheet;